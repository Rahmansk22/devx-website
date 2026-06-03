import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a random queue spot
    const spot = Math.floor(Math.random() * 450) + 14890;

    // Get origin dynamically from headers or default to a standard placeholder
    const origin = req.headers.get('origin') || req.nextUrl.origin || 'https://devx-website.vercel.app';

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.WAITLIST_FROM_EMAIL || 'onboarding@resend.dev';

    if (!resendApiKey) {
      console.warn('[WAITLIST] RESEND_API_KEY environment variable is not defined. Falling back to mock success.');
      return NextResponse.json({
        success: true,
        spot,
        message: 'Waitlist joined successfully! (Mock mode: RESEND_API_KEY is not defined)'
      });
    }

    // Dark-themed premium HTML confirmation email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to DevX</title>
          <style>
            body {
              background-color: #030303;
              color: #ffffff;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              padding: 40px 20px;
              background-color: #08080a;
              border: 1px solid #1a1a1f;
              border-radius: 24px;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
            }
            .logo-wrapper {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo-text {
              font-size: 24px;
              font-weight: 800;
              letter-spacing: -0.03em;
              text-transform: uppercase;
              color: #ffffff;
            }
            .logo-x {
              color: #7c5cff;
            }
            h1 {
              font-size: 28px;
              font-weight: 800;
              letter-spacing: -0.02em;
              text-align: center;
              margin-bottom: 24px;
              background: linear-gradient(180deg, #ffffff 0%, #a8a8a8 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            p {
              font-size: 15px;
              line-height: 1.6;
              color: #a0a0a5;
              margin-bottom: 24px;
            }
            .spot-card {
              background: rgba(124, 92, 255, 0.05);
              border: 1px solid rgba(124, 92, 255, 0.2);
              border-radius: 16px;
              padding: 24px;
              text-align: center;
              margin: 32px 0;
            }
            .spot-title {
              font-size: 11px;
              font-family: monospace;
              letter-spacing: 0.2em;
              color: #9ca3af;
              text-transform: uppercase;
              margin-bottom: 8px;
              font-weight: bold;
            }
            .spot-number {
              font-size: 36px;
              font-weight: 800;
              color: #00d4ff;
              margin: 0;
            }
            .btn {
              display: block;
              width: fit-content;
              margin: 30px auto 0 auto;
              padding: 14px 28px;
              background-color: #ffffff;
              color: #000000;
              text-decoration: none;
              font-weight: 700;
              font-size: 14px;
              border-radius: 9999px;
              text-align: center;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              font-size: 11px;
              color: #52525b;
              font-family: monospace;
              text-transform: uppercase;
              letter-spacing: 0.1em;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-wrapper">
              <span class="logo-text">Dev <span class="logo-x">X</span></span>
            </div>
            <h1>The Future of Building is Here.</h1>
            <p>Thank you for securing your position on the DevX waitlist. We are building the cognitive software creation platform for internet-scale applications.</p>
            <p>Our autonomous orchestration engine translates natural concept models directly into production-grade Next.js 15, React 19, Prisma schema, and PostgreSQL infrastructures, healing compilations in E2B sandboxes automatically.</p>
            
            <div class="spot-card">
              <div class="spot-title">Queue Spot Assigned</div>
              <h2 class="spot-number">Spot #${spot}</h2>
            </div>
            
            <p>We are releasing beta onboarding batches weekly based on queue priority. We will notify you immediately once your synthesis slot is pre-warmed and ready to boot.</p>
            
            <a href="${origin}" class="btn">Launch Platform</a>
            
            <div class="footer">
              &copy; 2026 DevX OS &middot; Autonomous Systems Inc.
            </div>
          </div>
        </body>
      </html>
    `;

    // Dispatch confirmation email via Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `DevX <${fromEmail}>`,
        to: [email],
        subject: "You're in! DevX Waitlist Spot Secured",
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('[WAITLIST] Resend API error response:', resendData);
      return NextResponse.json(
        { error: resendData.message || 'Failed to dispatch waitlist email.' },
        { status: resendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      spot,
      message: 'Waitlist joined successfully! Spot secured and email dispatched.'
    });

  } catch (error) {
    console.error('[WAITLIST] Handler error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error. Failed to join waitlist.' },
      { status: 500 }
    );
  }
}
