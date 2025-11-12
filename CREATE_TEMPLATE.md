# Create EmailJS Template - FINAL STEP

## You're almost done! Just need to create the email template.

### Step 1: Go to Templates
Visit: https://dashboard.emailjs.com/admin/templates

### Step 2: Click "Create New Template"

### Step 3: Configure Your Template

#### Template Settings:
- **Template Name**: Contact Form Submission (or any name you prefer)

#### Email Content:

**To Email**: (your email where you want to receive messages)

**From Name**: {{user_name}}

**From Email**: (use the email you connected to your service)

**Reply To**: {{user_email}}

**Subject**: 
```
New Contact Form Message from {{user_name}}
```

**Content (Message Body)**:
```
You have received a new message from your website contact form:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FROM: {{user_name}}
EMAIL: {{user_email}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This message was sent from your website's contact form.
```

### Step 4: IMPORTANT - Use These Exact Variable Names:
- `{{user_name}}` - sender's name
- `{{user_email}}` - sender's email
- `{{message}}` - the message content

These MUST match what your form is sending!

### Step 5: Save Template
Click **Save** button

### Step 6: Copy Template ID
After saving, you'll see a **Template ID** (looks like: `template_xyz123`)
Copy this ID!

### Step 7: Update .env File
Open your `.env` file and replace:
```
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

With your actual Template ID:
```
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz123
```

### Step 8: Restart Your Server
```powershell
# Press Ctrl+C to stop
# Then run:
npm run dev
```

### Step 9: Test!
Go to: http://localhost:3000/contactus

Fill out the form and submit. You should receive an email! 🎉

---

## Current Status:
✅ Service ID: service_04prgqp
✅ Public Key: ItpKFLuZS7DFNAuBz
⚠️  Template ID: **NEEDS TO BE CREATED**

Once you add the Template ID, everything will work!
