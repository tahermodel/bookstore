require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
    console.log('Testing Resend with key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    try {
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'delivered@resend.dev', // Resend's test address
            subject: 'Test email',
            html: '<p>Test</p>',
        });
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
