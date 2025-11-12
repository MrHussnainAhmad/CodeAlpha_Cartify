# EmailJS Setup Guide for Contact Form

## Prerequisites
✅ EmailJS package is already installed (`@emailjs/browser` v4.4.1)
✅ Contact form component is ready
✅ Environment variables placeholders added to `.env` file

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://dashboard.emailjs.com/sign-up](https://dashboard.emailjs.com/sign-up)
2. Sign up for a free account (no credit card required)
3. Verify your email address

### 2. Get Your Public Key
1. After logging in, go to [https://dashboard.emailjs.com/admin/account](https://dashboard.emailjs.com/admin/account)
2. Find your **Public Key** in the "API Keys" section
3. Copy this key

### 3. Add Email Service
1. Go to [https://dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)
2. Click on **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps for your provider
5. **Copy the Service ID** (e.g., `service_abc123`)

### 4. Create Email Template
1. Go to [https://dashboard.emailjs.com/admin/templates](https://dashboard.emailjs.com/admin/templates)
2. Click **"Create New Template"**
3. Use this template structure:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Message from {{user_name}}

**Content (HTML or Plain Text):**
```
New message from your website contact form:

Name: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
This message was sent from your website contact form.
```

4. **Important:** Make sure the variable names match: `{{user_name}}`, `{{user_email}}`, `{{message}}`
5. Click **"Save"**
6. **Copy the Template ID** (e.g., `template_xyz789`)

### 5. Update Environment Variables
1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123    # Replace with your Service ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789  # Replace with your Template ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key   # Replace with your Public Key
```

### 6. Restart Development Server
After updating the `.env` file:
```powershell
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Testing the Form
1. Go to `http://localhost:3000/contactus`
2. Fill out the contact form
3. Submit the form
4. You should receive an email at the address you configured in EmailJS
5. Check the EmailJS dashboard for delivery status

## Troubleshooting

### Issue: "Public key is required" error
- Make sure you've added the public key to `.env` file
- Restart your dev server after updating `.env`
- Check that the variable name is exactly `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

### Issue: Email not sending
- Check EmailJS dashboard for error logs
- Verify your email service is properly connected
- Make sure template variables match form field names
- Check spam folder for test emails

### Issue: "Service ID not found"
- Verify the Service ID is correct
- Make sure the service is active in EmailJS dashboard

### Free Tier Limits
- EmailJS free tier allows **200 emails/month**
- If you need more, consider upgrading to a paid plan

## Security Notes
✅ The `NEXT_PUBLIC_` prefix makes these variables accessible in the browser (required for EmailJS)
✅ This is safe because EmailJS public keys are designed to be public
✅ EmailJS handles authentication server-side with domain restrictions

## Additional Configuration (Optional)

### Add Domain Restrictions
For security, you can restrict which domains can use your EmailJS credentials:
1. Go to EmailJS dashboard → Account
2. Add your domain (e.g., `localhost`, `yourdomain.com`)
3. This prevents others from using your credentials

### Customize Email Template
You can enhance your email template with:
- HTML styling
- Reply-to field: `{{user_email}}`
- CC/BCC addresses
- Attachments support

## Support
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

---

**Once you've completed these steps, your contact form will be fully functional!** 🎉
