import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    

    const emailServer = process.env.EMAIL_SERVER;
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    
    if (!emailServer || !emailUser || !emailPassword) {
      console.error('Email configuration is missing. Please check your .env.local file');
      return NextResponse.json(
        {
          success: false,
          message: 'Email server not configured',
          error: 'Missing email configuration'
        },
        { status: 500 }
      );
    }
    
 
    const transporter = nodemailer.createTransport({
      host: emailServer,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });


    const fromEmail = process.env.EMAIL_FROM || emailUser;
    

    const toEmail = process.env.EMAIL_TO || emailUser;
    
    // 1. Send the ContactForm to Admin
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email} (You can reply directly to this message)
        
        Message: 
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    
    // 2. Send thank you email to the sender 
 await transporter.sendMail({
  from: fromEmail,
  to: email,
  subject: `Thank you for contacting Reflekta Community`,
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You - Reflekta Community</title>
</head>
<body style="margin:0;padding:0;background-color:#f9f8f6;font-family:Arial,sans-serif;">

  <div style="max-width:600px;margin:40px auto;padding:32px 24px;background:#ffffff;border:1px solid #e0e0e0;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.05);position:relative;overflow:hidden;color:#553a5c;">

    <div style="position:relative;z-index:1;">

      <!-- Header -->
      <div style="text-align:center;">
        <h2 style="font-size:22px;margin:0 0 24px;color:#ffffff;background:linear-gradient(135deg,#937195,#bca6c9);padding:14px 20px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          Thank You for Contacting Us
        </h2>
      </div>

      <!-- Body -->
      <div style="font-size:16px;line-height:1.6;color:#3a2e3f;">
        <p>Dear <strong>${name.toUpperCase()}</strong>,</p>
        <p style="margin:12px 0 0;">Thank you for reaching out to the <strong>Reflekta Community</strong>. We've received your message and will get back to you shortly.</p>

        <div style="background-color:#f3f1f6;border-left:4px solid #937195;padding:12px 16px;border-radius:6px;margin:24px 0;">
          <p style="margin:0;"><strong>Your message:</strong></p>
          <p style="margin:6px 0 0;font-style:italic;color:#444;">${message}</p>
        </div>

        <p>We're excited to connect and grow together.</p>
      </div>

      <!-- CTA Button -->
      <div style="text-align:center;margin-top:24px;">
        <a href="https://reflekta-frontend.vercel.app" target="_blank" style="display:inline-block;background:#553a5c;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
          Visit Our Site
        </a>
      </div>

      <!-- Footer -->
      <div style="text-align:center;margin-top:32px;color:#999;font-size:13px;">
        <p>© ${new Date().getFullYear()} Reflekta Community. All rights reserved.</p>
      </div>

    </div>
  </div>

</body>
</html>




`,
});

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email',
        error: (error as Error).message
      },
      { status: 500 }
    );
  }
}
