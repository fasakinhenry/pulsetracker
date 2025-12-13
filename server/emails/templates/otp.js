export const otpEmail = (otp) => `
  <div style="font-family: Arial; padding: 20px">
    <h2>Your verification code</h2>
    <p style="font-size: 24px; font-weight: bold;">${otp}</p>
    <p>This code expires in 10 minutes.</p>
  </div>
`;
