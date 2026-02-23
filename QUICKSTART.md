# Kodbank - Quick Start Guide

## 🚀 What You Got

A complete banking dashboard application with:
- User registration & login
- Financial dashboard
- AI chat assistant
- MySQL database integration
- Ready to deploy to Vercel

## 📋 Before You Start

You'll need to set up 2 free services (takes ~10 minutes total):

1. **Aiven MySQL** (free database)
2. **Hugging Face** (free AI API)

## 🎯 Setup Steps

### 1️⃣ Set Up Database (5 minutes)

**A. Create Aiven Account:**
- Go to: https://console.aiven.io/signup
- Sign up (free, no credit card needed)

**B. Create MySQL Service:**
- Click "Create Service" 
- Select "MySQL"
- Choose "Free Plan" (Hobbyist-2)
- Select region closest to you
- Name it: "kodbank-db"
- Click "Create Service"
- Wait 5-10 minutes for it to start ☕

**C. Get Connection Details:**
Once running, you'll see on the Overview page:
```
Host: mysql-xxxxx.aivencloud.com
Port: 12345
User: avnadmin
Password: ******************
Database: defaultdb
```
**Save these - you'll need them!**

**D. Set Up Tables:**
Option 1 - Use Aiven Console (easiest):
- Click "Databases" tab
- Click "Open in browser"
- Copy and paste content from `schema.sql`
- Click "Execute"

Option 2 - Use MySQL Client:
```bash
mysql -h your-host -P your-port -u avnadmin -p defaultdb < schema.sql
```

### 2️⃣ Get AI API Key (2 minutes)

**A. Create Hugging Face Account:**
- Go to: https://huggingface.co/join
- Sign up (free)

**B. Get API Token:**
- Go to: Settings → Access Tokens
- Click "New token"
- Name: "kodbank"
- Role: "Read"
- Click "Generate"
- **Copy the token (starts with hf_...)**

### 3️⃣ Deploy to Vercel (3 minutes)

**A. Push to GitHub:**
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub, then:
git remote add origin https://github.com/yourusername/kodbank.git
git push -u origin main
```

**B. Deploy:**
- Go to: https://vercel.com
- Click "New Project"
- Import your GitHub repo
- **Add Environment Variables** (click "Environment Variables"):

```
DB_HOST=mysql-xxxxx.aivencloud.com (from Aiven)
DB_PORT=12345 (from Aiven)
DB_USER=avnadmin (from Aiven)
DB_PASSWORD=your-password (from Aiven)
DB_NAME=defaultdb (from Aiven)
NEXTAUTH_SECRET=generate-random-32-char-string
NEXTAUTH_URL=https://your-app.vercel.app (you'll get this after deploy)
HUGGINGFACE_API_KEY=hf_your-token (from Hugging Face)
```

To generate NEXTAUTH_SECRET:
- Mac/Linux: Run `openssl rand -base64 32`
- Windows: Use https://generate-secret.vercel.app/32

**C. Deploy:**
- Click "Deploy"
- Wait ~2 minutes
- Copy your app URL (e.g., https://kodbank.vercel.app)

**D. Update NEXTAUTH_URL:**
- Go to Project Settings → Environment Variables
- Find NEXTAUTH_URL
- Update it to your actual Vercel URL
- Click "Redeploy" button

### 4️⃣ Test Your App

1. Visit your Vercel URL
2. Click "Sign up"
3. Create an account
4. Login
5. See your dashboard! 🎉
6. Click "AI Chat" to test the chatbot

## 🎨 Features

### Dashboard
- View total balance, income, expenses, savings
- See recent transactions
- Modern dark theme interface

### AI Chat
- Click "AI Chat" in sidebar
- Ask questions
- AI responds using Hugging Face
- Chat history is saved

### Navigation
- Dashboard: Main overview
- Analytics, Cards, Assets: Placeholder pages
- Profile: User settings (placeholder)
- Settings: App settings (placeholder)
- Logout: Sign out

## 🔧 Local Development

Want to run locally?

1. Clone the repo
2. Install: `npm install`
3. Create `.env.local`:
```env
DB_HOST=your-aiven-host
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=defaultdb
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
HUGGINGFACE_API_KEY=hf_your-key
```
4. Run: `npm run dev`
5. Open: http://localhost:3000

## 🐛 Troubleshooting

### Can't login after registering
- Clear browser cookies
- Try incognito mode
- Check Vercel logs for errors

### AI chat not responding
- First message takes 10-20 seconds (model cold start)
- Check Hugging Face API key is correct
- Verify you have API quota left

### Database errors
- Verify Aiven service is running (green status)
- Check connection details are correct
- Make sure you ran schema.sql

### Need more help?
- Check `README.md` for detailed docs
- Check `DEPLOYMENT.md` for deployment guide
- Look at Vercel deployment logs

## 📁 Project Structure

```
kodbank/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Login, register, logout
│   │   ├── chat/         # AI chat
│   │   └── dashboard/    # Dashboard data
│   ├── dashboard/        # Dashboard page
│   ├── login/           # Login page
│   └── register/        # Register page
├── lib/
│   └── db.ts           # Database connection
├── schema.sql          # Database schema
├── .env.example        # Environment template
└── README.md          # Full documentation
```

## 🎓 Next Steps

Now that it's working, you can:

1. Customize the design colors and layout
2. Add more AI models from Hugging Face
3. Add more transaction types
4. Build the Analytics, Cards, and Assets pages
5. Add data visualization charts
6. Implement real payment integrations

## 💡 Tips

- The sample data is automatically created for new users
- You can modify `stats` in the database to change displayed amounts
- Chat history is stored per user in the database
- All passwords are hashed with bcrypt

## 🎉 You're Done!

Your banking dashboard is live and ready to use. Share the link with others and they can create their own accounts!

---

Questions? Check the full README.md or DEPLOYMENT.md files.
