import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, code: string) {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
        console.error('CRITICAL: GMAIL_USER or GMAIL_APP_PASSWORD is missing from environment variables.');
        return { success: false, error: 'Internal configuration error' };
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user,
            pass,
        },
    });

    try {
        console.log(`[Email] Attempting to send code to: ${email} via Gmail SMTP`);

        const mailOptions = {
            from: `"Editorial" <${user}>`,
            to: email,
            subject: 'Verify your email | Editorial',
            html: `
                <div style="font-family: serif; max-width: 600px; margin: 0 auto; background: #faf9f6; padding: 40px; color: #1c1917;">
                    <h1 style="font-weight: normal; margin-bottom: 24px; border-bottom: 1px solid #e7e5e4; padding-bottom: 16px;">Editorial</h1>
                    <p style="font-style: italic; margin-bottom: 32px;">Please confirm your registration.</p>
                    <p style="margin-bottom: 16px;">Use the following code to verify your identity:</p>
                    <div style="background: #1c1917; color: #faf9f6; padding: 24px; font-size: 32px; letter-spacing: 0.5em; text-align: center; margin-bottom: 32px; font-weight: bold;">
                        ${code}
                    </div>
                    <p style="font-size: 12px; color: #78716c;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
                </div>
            `,
        };

        const result = await transporter.sendMail(mailOptions);

        console.log('Gmail SMTP Success. Message ID:', result.messageId);
        return { success: true, data: result };
    } catch (error) {
        console.error('Failed to send verification email (Caught Exception):', error);
        return { success: false, error };
    }
}
