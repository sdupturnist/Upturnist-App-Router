import { 
  emailPassword, 
  emailUsername, 
  hostName, 
  portNumber, 
  siteEmail, 
  siteFromEmail 
} from "@/utils/variables";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// In App Router, API routes are created as Route Handlers
// This file should be placed in app/api/package-booking/route.js

export async function POST(request) {
  // Parse the request body
  const body = await request.json();
  
  const {
    name,
    companyName,
    phone,
    website,
    description,
    selectedPackage
  } = body;
  
  const mailFor = "Package Booking form";
  
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
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${mailFor} Notification</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333333;">New ${mailFor} email Received</h2>
        <p style="color: #555555;">Hi Admin,</p>
        <p style="color: #555555;">We have received a ${mailFor} through our website. Below are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Name:</td>
                <td style="padding: 8px; color: #333333;">${name}</td>
            </tr>
            
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Company Name:</td>
                <td style="padding: 8px; color: #333333;">${companyName}</td>
            </tr>
            
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Phone:</td>
                <td style="padding: 8px; color: #333333;">${phone}</td>
            </tr>
            
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Website:</td>
                <td style="padding: 8px; color: #333333;">${website}</td>
            </tr>
            
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Description:</td>
                <td style="padding: 8px; color: #333333;">${description}</td>
            </tr>
            
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Package:</td>
                <td style="padding: 8px; color: #333333;">${selectedPackage}</td>
            </tr>
            
        </table>
        
        <p style="color: #555555;">Please review the enquiry and respond accordingly.</p>
    </div>
</body>
</html>`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}