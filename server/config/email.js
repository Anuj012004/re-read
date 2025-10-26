// const nodemailer = require('nodemailer');

// // Create reusable transporter
// const createTransporter = () => {
//   // Note: In nodemailer 7.x, the method is createTransport (not createTransporter)
//   return nodemailer.createTransport({
//     service: 'gmail', // or 'outlook', 'yahoo', etc.
//     auth: {
//       user: process.env.EMAIL_USER, // your email
//       pass: process.env.EMAIL_PASSWORD // your app password
//     }
//   });
// };

// // Send verification email
// const sendVerificationEmail = async (email, name, verificationToken) => {
//   const transporter = createTransporter();
  
//   const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  
//   const mailOptions = {
//     from: `"RE-READ" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Verify Your Email - RE-READ',
//     html: `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//             .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
//             .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
//             .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>Welcome to RE-READ!</h1>
//             </div>
//             <div class="content">
//               <p>Hi ${name},</p>
//               <p>Thank you for registering with RE-READ. Please verify your email address to activate your account.</p>
//               <div style="text-align: center;">
//                 <a href="${verificationUrl}" class="button">Verify Email Address</a>
//               </div>
//               <p>Or copy and paste this link in your browser:</p>
//               <p style="word-break: break-all; color: #3b82f6;">${verificationUrl}</p>
//               <p><strong>This link will expire in 24 hours.</strong></p>
//               <p>If you didn't create an account, please ignore this email.</p>
//             </div>
//             <div class="footer">
//               <p>&copy; 2025 RE-READ. All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Verification email sent to:', email);
//   } catch (error) {
//     console.error('Error sending verification email:', error);
//     throw new Error('Failed to send verification email');
//   }
// };

// // Send password reset email
// const sendPasswordResetEmail = async (email, name, resetToken) => {
//   const transporter = createTransporter();
  
//   const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
//   const mailOptions = {
//     from: `"RE-READ" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Password Reset Request - RE-READ',
//     html: `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//             .header { background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
//             .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
//             .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
//             .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
//             .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>Password Reset Request</h1>
//             </div>
//             <div class="content">
//               <p>Hi ${name},</p>
//               <p>We received a request to reset your password for your RE-READ account.</p>
//               <div style="text-align: center;">
//                 <a href="${resetUrl}" class="button">Reset Password</a>
//               </div>
//               <p>Or copy and paste this link in your browser:</p>
//               <p style="word-break: break-all; color: #3b82f6;">${resetUrl}</p>
//               <p><strong>This link will expire in 1 hour.</strong></p>
//               <div class="warning">
//                 <p><strong>⚠️ Security Notice:</strong></p>
//                 <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
//               </div>
//             </div>
//             <div class="footer">
//               <p>&copy; 2025 RE-READ. All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Password reset email sent to:', email);
//   } catch (error) {
//     console.error('Error sending password reset email:', error);
//     throw new Error('Failed to send password reset email');
//   }
// };

// module.exports = {
//   sendVerificationEmail,
//   sendPasswordResetEmail
// };

const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  // Note: In nodemailer 7.x, the method is createTransport (not createTransporter)
  return nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASSWORD // your app password
    }
  });
};

// Send verification email
const sendVerificationEmail = async (email, name, verificationToken) => {
  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  
  const mailOptions = {
    from: `"RE-READ" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - RE-READ',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to RE-READ!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for registering with RE-READ. Please verify your email address to activate your account.</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              <p>Or copy and paste this link in your browser:</p>
              <p style="word-break: break-all; color: #3b82f6;">${verificationUrl}</p>
              <p><strong>This link will expire in 24 hours.</strong></p>
              <p>If you didn't create an account, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 RE-READ. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, name, resetToken) => {
  const transporter = createTransporter();
  
  // IMPORTANT: Use /reset-password NOT /verify-email
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  console.log('🔗 Password reset URL:', resetUrl); // Debug log
  
  const mailOptions = {
    from: `"RE-READ" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request - RE-READ',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We received a request to reset your password for your RE-READ account.</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              <p>Or copy and paste this link in your browser:</p>
              <p style="word-break: break-all; color: #3b82f6;">${resetUrl}</p>
              <p><strong>This link will expire in 1 hour.</strong></p>
              <div class="warning">
                <p><strong>⚠️ Security Notice:</strong></p>
                <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
              </div>
            </div>
            <div class="footer">
              <p>&copy; 2025 RE-READ. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};