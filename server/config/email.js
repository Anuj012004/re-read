const SibApiV3Sdk = require('@sendinblue/client');

// Initialize Brevo API client
const initializeBrevoClient = () => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  return apiInstance;
};

// Send verification email
const sendVerificationEmail = async (email, name, verificationToken) => {
  const apiInstance = initializeBrevoClient();
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
  sendSmtpEmail.sender = { 
    name: "RE-READ", 
    email: process.env.BREVO_SENDER_EMAIL 
  };
  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.subject = "Verify Your Email - RE-READ";
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Welcome to RE-READ!</h1>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
        
        <p style="font-size: 14px; color: #666; line-height: 1.6;">
          Thank you for registering with RE-READ! We're excited to have you on board.
          Please verify your email address to activate your account.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #4CAF50; color: white; padding: 14px 32px; 
                    text-decoration: none; border-radius: 6px; display: inline-block;
                    font-weight: bold; font-size: 16px;">
            Verify Email Address
          </a>
        </div>
        
        <p style="font-size: 12px; color: #999; margin-top: 20px;">
          Or copy and paste this link into your browser:
        </p>
        <p style="font-size: 12px; color: #4CAF50; word-break: break-all;">
          ${verificationUrl}
        </p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        
        <p style="font-size: 11px; color: #999; text-align: center;">
          If you didn't create an account with RE-READ, please ignore this email.
        </p>
      </div>
    </div>
  `;

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Verification email sent successfully:', data.messageId);
    return data;
  } catch (error) {
    console.error('Brevo API Error:', error);
    throw new Error('Failed to send verification email');
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, name, resetToken) => {
  const apiInstance = initializeBrevoClient();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
  sendSmtpEmail.sender = { 
    name: "RE-READ", 
    email: process.env.BREVO_SENDER_EMAIL 
  };
  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.subject = "Password Reset Request - RE-READ";
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Password Reset Request</h1>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
        
        <p style="font-size: 14px; color: #666; line-height: 1.6;">
          We received a request to reset your password. Click the button below to create a new password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #2196F3; color: white; padding: 14px 32px; 
                    text-decoration: none; border-radius: 6px; display: inline-block;
                    font-weight: bold; font-size: 16px;">
            Reset Password
          </a>
        </div>
        
        <p style="font-size: 12px; color: #999; margin-top: 20px;">
          Or copy and paste this link into your browser:
        </p>
        <p style="font-size: 12px; color: #2196F3; word-break: break-all;">
          ${resetUrl}
        </p>
        
        <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0;">
          <p style="margin: 0; color: #856404; font-size: 13px;">
            ⚠️ <strong>Important:</strong> This link will expire in 1 hour for security reasons.
          </p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        
        <p style="font-size: 11px; color: #999; text-align: center;">
          If you didn't request a password reset, please ignore this email.<br>
          Your password will remain unchanged.
        </p>
      </div>
    </div>
  `;

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Password reset email sent successfully:', data.messageId);
    return data;
  } catch (error) {
    console.error('Brevo API Error:', error);
    throw new Error('Failed to send password reset email');
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};