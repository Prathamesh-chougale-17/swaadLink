export const getUserEmailTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Chef Finder</title>
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
      <h1>Thank You for Contacting Chef Finder</h1>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to Chef Finder. We have received your message and appreciate your interest in our services.</p>
      <p>Our team will review your inquiry and get back to you as soon as possible, usually within 1-2 business days.</p>
      <p>In the meantime, feel free to explore our website for more information about our services and available chefs.</p>
      <p>Best regards,<br>The Chef Finder Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Chef Finder. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
