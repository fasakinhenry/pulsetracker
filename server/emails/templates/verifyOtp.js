export const verifyOtpEmail = (otp, name) => `
  <div style="font-family:Arial;padding:20px;">
    <h2>Hello ${name}, verify your email</h2>
    <p>Your 6-digit verification code is:</p>
    <h1 style="font-size:32px;letter-spacing:6px;">${otp}</h1>
    <p>This code expires in 10 minutes.</p>
  </div>
`;
