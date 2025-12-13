export const magicLinkEmail = (link) => `
  <div style="font-family:Arial;padding:20px;">
    <h2>Login to your account</h2>
    <p>Click the button below to login instantly:</p>
    <a href="${link}" 
       style="background:#2563eb;color:white;padding:12px 18px;
       text-decoration:none;border-radius:6px;display:inline-block;">
      Login Now
    </a>
    <p>This link expires in 10 minutes.</p>
  </div>
`;
