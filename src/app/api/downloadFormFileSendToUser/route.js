import {
  emailPassword,
  emailUsername,
  hostName,
  portNumber,
  siteEmail,
  siteFromEmail,
} from "@/utils/variables";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, downloadFile } = body;
    
    const mailFor = "We appreciate your time to share your details. Download PDF";
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: hostName,
      port: portNumber,
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });
    
    const mailOptions = {
      from: siteFromEmail,
      to: email,
      subject: `${mailFor} | Upturnist`,
      html: `<!DOCTYPE html> <html lang="en"> <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SEO Audit Report</title> </head> 
          <body style="margin: 0; padding: 0; background-color: #152a37; font-family: Arial, sans-serif; color: #000000;">
              <table role="presentation" style="width: 100%; padding: 20px; text-align: center;">
                  <tr>
                      <td align="center">
                          <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                              <tr>
                                  <td style="text-align: center;">
                                      <h1 style="color: #152a37; font-size: 24px; margin-bottom: 20px;">Thank You for Sharing Your Details!</h1>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="font-size: 16px; line-height: 1.6; color: #000000; text-align: center;">
                                      <p>Our SEO Expert will inspect your website and revert to you with SEO Audit Report.</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="text-align: center; padding-top: 20px;">
                                      <a href="${downloadFile}" style="display: inline-block; padding: 12px 24px; background-color: #152a37; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px;">Download PDF</a>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="text-align: center; font-size: 12px; color: #888888; margin-top: 20px;">
                                      <p>If you have any questions, feel free to contact us.</p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </body> </html>`,
    };
    
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}