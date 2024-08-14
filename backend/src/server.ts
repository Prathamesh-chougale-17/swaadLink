import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import connectDB from './config/database';
import chefRoutes from './routes/chefRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const adminEmail = process.env.EMAIL_USER;
connectDB();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
},
});

app.use('/api', chefRoutes);

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;
    
  try {
    // Send confirmation email to user
    await transporter.sendMail({
      from: adminEmail,
      to: email,
      subject: 'Thank you for contacting Swaad Link',
      html: getUserEmailTemplate(name),
    });

    // Send notification email to company
    await transporter.sendMail({
      from: adminEmail,
      to: adminEmail,
      subject: 'New Contact Form Submission',
      html: getCompanyEmailTemplate(name, email, message),
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function getUserEmailTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4299E1; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f8f8f8; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Contacting Swaad Link</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Swaad Link. We have received your message and appreciate your interest in our services.</p>
            <p>Our team will review your inquiry and get back to you as soon as possible, usually within 1-2 business days.</p>
            <p>In the meantime, feel free to explore our website for more information about our services and available chefs.</p>
            <p>Best regards,<br>The Swaad Link Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Swaad Link. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function getCompanyEmailTemplate(name: string, email: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4299E1; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f8f8f8; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Swaad Link. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}