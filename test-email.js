require('dotenv').config();
const nodemailer = require('nodemailer');

async function test() {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    console.log('Testing Gmail with:', { user, pass: pass ? 'Present' : 'Missing' });

    if (!user || !pass) {
        console.error('Missing credentials');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user,
            pass,
        },
    });

    try {
        const result = await transporter.sendMail({
            from: `"Test" <${user}>`,
            to: user, // Send to yourself
            subject: 'Test email from NextJS Bookstore',
            html: '<p>Test successful!</p>',
        });
        console.log('Result:', result.messageId);
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
