import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendWelcomeEmail = async (name, email) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to MANSOL LMS!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #3b82f6; margin-bottom: 20px;">Welcome to MANSOL LMS!</h1>
          
          <p style="font-size: 16px; color: #4b5563;">Dear ${name},</p>
          
          <p style="color: #4b5563;">Thank you for joining MANSOL LMS! We're excited to have you as part of our learning community.</p>
          
          <p style="color: #4b5563;">With your new account, you can:</p>
          <ul style="color: #4b5563;">
            <li>Access all your enrolled courses</li>
            <li>Track your learning progress</li>
            <li>Participate in discussions</li>
            <li>Submit assignments and take quizzes</li>
          </ul>
          
          <p style="color: #4b5563;">If you have any questions, feel free to reach out to our support team.</p>
          
          <p style="color: #4b5563;">Best regards,<br>The MANSOL LMS Team</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #6b7280; font-size: 14px;">&copy; ${new Date().getFullYear()} MANSOL LMS. All rights reserved.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

export const sendAdminNotification = async (newUserName, newUserEmail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'tauheeddeveloper13@gmail.com',
      subject: 'New User Registration - MANSOL LMS ',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #3b82f6; margin-bottom: 20px;">New User Registration</h1>
          
          <p style="color: #4b5563;">A new user has registered on MANSOL LMS:</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${newUserName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${newUserEmail}</p>
            <p style="margin: 5px 0;"><strong>Registration Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #4b5563;">The user has been automatically assigned the Student role.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #6b7280; font-size: 14px;">&copy; ${new Date().getFullYear()} MANSOL LMS. All rights reserved.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
};