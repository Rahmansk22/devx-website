import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a random queue spot
    const spot = Math.floor(Math.random() * 450) + 14890;

    return NextResponse.json({
      success: true,
      spot,
      message: 'Waitlist joined successfully! Spot secured.'
    });

  } catch (error) {
    console.error('[WAITLIST] Handler error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error. Failed to join waitlist.' },
      { status: 500 }
    );
  }
}
