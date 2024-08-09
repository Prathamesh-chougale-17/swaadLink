export const getCompanyEmailTemplate = (
  name: string,
  email: string,
  message: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
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
      <p>&copy; 2024 Chef Finder. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
