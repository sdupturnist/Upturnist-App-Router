import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import {
  emailPassword,
  emailUsername,
  hostName,
  portNumber,
  siteEmail,
  siteFromEmail,
} from "@/utils/variables";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, place, website } = body;
    
    const mailFor = "Call";
    
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
      to: siteEmail,
      subject: `${mailFor} | Upturnist`,
      html: `<!DOCTYPE html> <html lang="en"> <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${mailFor} Notification</title> </head> 
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333333;">New ${mailFor} Received</h2>
          <p style="color: #555555;">Hi Admin,</p>
          <p style="color: #555555;">We have received an inquiry through our website. Below are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                  <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Name:</td>
                  <td style="padding: 8px; color: #333333;">${name}</td>
              </tr>
              
              <tr>
                  <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Email:</td>
                  <td style="padding: 8px; color: #333333;">${email}</td>
              </tr>
              
              <tr>
                  <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Phone Number:</td>
                  <td style="padding: 8px; color: #333333;">${phone}</td>
              </tr>
              
              <tr>
                  <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Place:</td>
                  <td style="padding: 8px; color: #333333;">${place}</td>
              </tr>
              
              <tr>
                  <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Website:</td>
                  <td style="padding: 8px; color: #333333;">${website}</td>
              </tr>
              
          </table>
          
          <p style="color: #555555;">Please review the inquiry and respond accordingly.</p>
      </div> </body> </html>`,
    };
    
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: "Failed to send email", details: error.message }, { status: 500 });
  }
}