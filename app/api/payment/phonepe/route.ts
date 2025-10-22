/**
 * PhonePe Payment Gateway Integration
 * Handles payment initiation and verification
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PHONEPE_BASE_URL =
  process.env.NEXT_PUBLIC_PHONEPE_ENV === 'production'
    ? 'https://api.phonepe.com/apis/hermes'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

const MERCHANT_ID = process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID || '';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || '';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';

/**
 * Generate SHA256 hash for PhonePe checksum
 */
function generateChecksum(payload: string): string {
  const checksumString = payload + '/pg/v1/pay' + SALT_KEY;
  const checksum = crypto.createHash('sha256').update(checksumString).digest('hex');
  return checksum + '###' + SALT_INDEX;
}

/**
 * POST /api/payment/phonepe
 * Initiate PhonePe payment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, userPhone, userName, userEmail, callbackUrl } = body;

    // Validate required fields
    if (!orderId || !amount || !userPhone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: orderId, amount, userPhone',
        },
        { status: 400 }
      );
    }

    // Validate PhonePe configuration
    if (!MERCHANT_ID || !SALT_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'PhonePe payment gateway not configured. Please add credentials to .env.local',
        },
        { status: 500 }
      );
    }

    // Create PhonePe payment payload
    const merchantTransactionId = `TXN_${orderId}_${Date.now()}`;
    const redirectUrl = callbackUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`;
    const callbackUrlApi = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/phonepe/callback`;

    const paymentPayload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: userEmail || `USER_${Date.now()}`,
      amount: Math.round(amount * 100), // Convert to paise
      redirectUrl: redirectUrl,
      redirectMode: 'POST',
      callbackUrl: callbackUrlApi,
      mobileNumber: userPhone.replace(/\D/g, ''), // Remove non-digits
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    // Encode payload to base64
    const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');

    // Generate checksum
    const checksum = generateChecksum(base64Payload);

    // Make request to PhonePe
    const response = await fetch(`${PHONEPE_BASE_URL}/pg/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      body: JSON.stringify({
        request: base64Payload,
      }),
    });

    const result = await response.json();

    console.log('PhonePe API Response:', result);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: 'Payment initiated successfully',
          data: {
            merchantTransactionId,
            instrumentResponse: result.data.instrumentResponse,
            redirectUrl: result.data.instrumentResponse.redirectInfo.url,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.message || 'Failed to initiate payment',
          code: result.code,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('PhonePe payment initiation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initiate payment. Please try again.',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payment/phonepe?merchantTransactionId=xxx
 * Check payment status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const merchantTransactionId = searchParams.get('merchantTransactionId');

    if (!merchantTransactionId) {
      return NextResponse.json(
        {
          success: false,
          error: 'merchantTransactionId is required',
        },
        { status: 400 }
      );
    }

    // Generate checksum for status check
    const checksumString = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY;
    const checksum = crypto.createHash('sha256').update(checksumString).digest('hex');
    const xVerify = checksum + '###' + SALT_INDEX;

    // Check payment status
    const response = await fetch(
      `${PHONEPE_BASE_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerify,
          'X-MERCHANT-ID': MERCHANT_ID,
        },
      }
    );

    const result = await response.json();

    console.log('PhonePe Status Check Response:', result);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          data: result.data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.message || 'Failed to check payment status',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('PhonePe status check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check payment status',
      },
      { status: 500 }
    );
  }
}
