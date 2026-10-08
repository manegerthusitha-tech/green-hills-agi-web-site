import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiryType, company, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter using Spaceship SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for port 465 (SSL)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content sent to Green Hills inbox
    const mailOptions = {
      from: `"Green Hills Agri Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New Inquiry: ${inquiryType} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 0;">
          <!-- Header -->
          <div style="background: #2d6a2d; padding: 32px 40px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">🌿 New Website Inquiry</h1>

          </div>

          <!-- Body -->
          <div style="background: #ffffff; padding: 36px 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; width: 140px; color: #666; font-size: 14px; font-weight: 600;">Inquiry Type</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">
                  <span style="background: #e8f5e9; color: #2d6a2d; padding: 3px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">${inquiryType}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; color: #666; font-size: 14px; font-weight: 600;">Full Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; font-size: 14px; color: #222;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; color: #666; font-size: 14px; font-weight: 600;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #2d6a2d; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; color: #666; font-size: 14px; font-weight: 600;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; font-size: 14px; color: #222;">
                  <a href="tel:${phone}" style="color: #2d6a2d; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; color: #666; font-size: 14px; font-weight: 600;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8; font-size: 14px; color: #222;">${company}</td>
              </tr>
              ` : ""}
            </table>

            <!-- Message Box -->
            <div style="margin-top: 24px;">
              <p style="color: #666; font-size: 14px; font-weight: 600; margin-bottom: 10px;">Message</p>
              <div style="background: #f4f8f4; border-left: 4px solid #2d6a2d; padding: 16px 20px; border-radius: 0 6px 6px 0;">
                <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.7; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <!-- Reply CTA -->
            <div style="margin-top: 28px; padding: 16px; background: #f0f8f0; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #555;">Reply directly to this email to respond to ${name}</p>
              <a href="mailto:${email}" style="background: #2d6a2d; color: white; padding: 10px 28px; border-radius: 20px; text-decoration: none; font-size: 13px; font-weight: 600;">Reply Now</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f9f9f9; padding: 20px 40px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e8e8e8;">
            <p style="margin: 0; font-size: 12px; color: #999;">This email was sent from the contact form at greenhillsagri.com</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #999;">Green Hills Agriculture, Manuwangama/E, Chilaw, Sri Lanka</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Also send auto-reply to the customer
    const autoReplyOptions = {
      from: `"Green Hills Agriculture" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for your inquiry - Green Hills Agriculture`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2d6a2d; padding: 32px 40px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">🌿 Thank You, ${name}!</h1>
            <p style="color: #a8d5a8; margin: 6px 0 0 0; font-size: 14px;">We have received your inquiry</p>
          </div>
          <div style="background: #ffffff; padding: 36px 40px;">
            <p style="color: #333; font-size: 15px; line-height: 1.7;">Dear <strong>${name}</strong>,</p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              Thank you for reaching out to Green Hills Agriculture. We have successfully received your <strong>${inquiryType}</strong> and our team will review it carefully.
            </p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              We aim to respond within <strong>24 business hours</strong>. In the meantime, feel free to reach us directly:
            </p>
            <div style="background: #f4f8f4; padding: 16px 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 4px 0; font-size: 13px; color: #333;">📞 <strong>Phone:</strong> +94 77 465 2552</p>
              <p style="margin: 4px 0; font-size: 13px; color: #333;">📧 <strong>Email:</strong> info@greenhillsagri.com</p>
              <p style="margin: 4px 0; font-size: 13px; color: #333;">📍 <strong>Address:</strong> Manuwangama/E, Chilaw, Sri Lanka</p>
            </div>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">Thank you for considering us as your agricultural partner.</p>
            <p style="color: #333; font-size: 14px; font-weight: 600;">Warm regards,<br/>Green Hills Agriculture Team</p>
          </div>
          <div style="background: #f9f9f9; padding: 16px 40px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e8e8e8;">
            <p style="margin: 0; font-size: 12px; color: #999;">Green Hills Agriculture - Premium Gotu Kola Products, Sri Lanka</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
