/**
 * PhonePe Payment Gateway Integration (OAuth 2.0 API)
 * Official Docs: https://developer.phonepe.com/payment-gateway
 */

import { NextRequest, NextResponse } from 'next/server';

// PhonePe API URLs based on environment
const PHONEPE_AUTH_URL =
  process.env.NEXT_PUBLIC_PHONEPE_ENV === 'production'
    ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

const PHONEPE_PAY_URL =
  process.env.NEXT_PUBLIC_PHONEPE_ENV === 'production'
    ? 'https://api.phonepe.com/apis/pg/checkout/v2/pay'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay';

const PHONEPE_STATUS_URL =
  process.env.NEXT_PUBLIC_PHONEPE_ENV === 'production'
    ? 'https://api.phonepe.com/apis/pg/checkout/v2/status'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/status';

// OAuth credentials
const CLIENT_ID = process.env.NEXT_PUBLIC_PHONEPE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || '';
const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || 'v1';

/**
 * Get OAuth access token from PhonePe
 * Token is valid for ~7 days (expires_at timestamp returned)
 */
async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_version: CLIENT_VERSION,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials',
  });

  const response = await fetch(PHONEPE_AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const result = await response.json();

  if (!response.ok || !result.access_token) {
    throw new Error(result.message || 'Failed to get access token');
  }

  return result.access_token;
}


/**
 * POST /api/payment/phonepe
 * Initiate PhonePe payment using OAuth 2.0 API
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

    // Validate PhonePe OAuth configuration
    if (!CLIENT_ID || !CLIENT_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: 'PhonePe payment gateway not configured. Please add credentials to .env.local',
        },
        { status: 500 }
      );
    }

    // Step 1: Get OAuth access token
    let accessToken: string;
    try {
      accessToken = await getAccessToken();
    } catch (tokenError: any) {
      console.error('PhonePe OAuth error:', tokenError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to authenticate with PhonePe. Please check your credentials.',
          details: tokenError.message,
        },
        { status: 500 }
      );
    }

    // Step 2: Create payment request
    const merchantOrderId = `ORD_${orderId}_${Date.now()}`;
    const redirectUrl = callbackUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`;

    const paymentPayload = {
      merchantOrderId: merchantOrderId,
      amount: Math.round(amount * 100), // Convert to paise
      paymentFlow: {
        type: 'PG_CHECKOUT',
        merchantUrls: {
          redirectUrl: redirectUrl,
        },
      },
    };

    // Make payment request with OAuth token
    const response = await fetch(PHONEPE_PAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`,
      },
      body: JSON.stringify(paymentPayload),
    });

    const result = await response.json();

    if (response.ok && result.orderId) {
      return NextResponse.json(
        {
          success: true,
          message: 'Payment initiated successfully',
          data: {
            orderId: result.orderId,
            merchantOrderId: merchantOrderId,
            state: result.state,
            redirectUrl: result.redirectUrl,
            expiryAt: result.expireAt,
          },
        },
        { status: 200 }
      );
    } else {
      console.error('PhonePe payment failed:', result);
      return NextResponse.json(
        {
          success: false,
          error: result.message || 'Failed to initiate payment',
          code: result.code,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('PhonePe payment initiation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initiate payment. Please try again.',
        details: error.message,
      },
      { status: 500 }
    );
  }
}


/**
 * GET /api/payment/phonepe?orderId=xxx
 * Check payment status using OAuth 2.0 API
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          error: 'orderId is required',
        },
        { status: 400 }
      );
    }

    // Get OAuth access token
    let accessToken: string;
    try {
      accessToken = await getAccessToken();
    } catch (tokenError: any) {
      console.error('PhonePe OAuth error:', tokenError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to authenticate with PhonePe',
        },
        { status: 500 }
      );
    }

    // Check payment status
    const response = await fetch(`${PHONEPE_STATUS_URL}/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    console.log('PhonePe Status Check Response:', result);

    if (response.ok && result.orderId) {
      return NextResponse.json(
        {
          success: true,
          data: {
            orderId: result.orderId,
            merchantOrderId: result.merchantOrderId,
            state: result.state,
            amount: result.amount,
            paymentInstrument: result.paymentInstrument,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.message || 'Failed to check payment status',
          code: result.code,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('PhonePe status check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check payment status',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
