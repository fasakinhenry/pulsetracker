export const resetOtpEmail = (otp) => `
  <div style="font-family:Arial;padding:20px;">
    <h2>Reset Your Password</h2>
    <p>Your one-time password reset code is:</p>
    <h1 style="font-size:32px;letter-spacing:6px;">${otp}</h1>
    <p>This code expires in 10 minutes.</p>
  </div>
`;
