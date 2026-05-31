import { Resend } from 'resend';

// Please replace 're_xxxxxxxxx' with your real Resend API key
// By default, it will automatically fallback to the RESEND_API_KEY from your .env file
const apiKey = process.env.RESEND_API_KEY || 're_xxxxxxxxx';

if (apiKey === 're_xxxxxxxxx') {
  console.warn('⚠️ Warning: Using the placeholder API key. Please replace "re_xxxxxxxxx" with your real Resend API key or set the RESEND_API_KEY environment variable.');
}

const resend = new Resend(apiKey);

console.log(`Sending test email via Resend using key: ${apiKey.substring(0, 6)}...`);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'dummymail2222222@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
})
.then(response => {
  console.log('✅ Success! Resend response:', response);
})
.catch(error => {
  console.error('❌ Error dispatching email:', error);
});
