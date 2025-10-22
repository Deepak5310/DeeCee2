/**
 * PhonePe Payment Callback Handler
 * Handles payment status callbacks from PhonePe
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (only once)
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

const SALT_KEY = process.env.PHONEPE_SALT_KEY || '';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';

/**
 * POST /api/payment/phonepe/callback
 * Handle PhonePe payment callback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { response } = body;

    if (!response) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid callback data',
        },
        { status: 400 }
      );
    }

    // Decode base64 response
    const decodedResponse = JSON.parse(Buffer.from(response, 'base64').toString('utf-8'));

    console.log('PhonePe Callback - Decoded Response:', decodedResponse);

    // Verify checksum
    const xVerifyHeader = request.headers.get('X-VERIFY');
    if (xVerifyHeader) {
      const [receivedChecksum] = xVerifyHeader.split('###');
      const expectedChecksum = crypto
        .createHash('sha256')
        .update(response + SALT_KEY)
        .digest('hex');

      if (receivedChecksum !== expectedChecksum) {
        console.error('Checksum verification failed');
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid checksum',
          },
          { status: 400 }
        );
      }
    }

    // Extract order ID from merchantTransactionId (format: TXN_ORDxxxxx_timestamp)
    const merchantTransactionId = decodedResponse.data.merchantTransactionId;
    const orderId = merchantTransactionId.split('_')[1]; // Extract ORDxxxxx

    // Update order in Firestore based on payment status
    if (decodedResponse.success && decodedResponse.code === 'PAYMENT_SUCCESS') {
      const db = getFirestore();

      await db.collection('orders').doc(orderId).update({
        paymentStatus: 'Paid',
        paymentId: decodedResponse.data.transactionId,
        updatedAt: new Date().toISOString(),
      });

      console.log(`✅ Payment successful for order ${orderId}`);

      return NextResponse.json(
        {
          success: true,
          message: 'Payment verified and order updated',
        },
        { status: 200 }
      );
    } else {
      // Payment failed
      const db = getFirestore();

      await db.collection('orders').doc(orderId).update({
        paymentStatus: 'Failed',
        updatedAt: new Date().toISOString(),
      });

      console.log(`❌ Payment failed for order ${orderId}`);

      return NextResponse.json(
        {
          success: false,
          message: 'Payment failed',
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('PhonePe callback handling error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process callback',
      },
      { status: 500 }
    );
  }
}
