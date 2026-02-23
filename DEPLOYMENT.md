# Quick Deployment Guide

## Step 1: Set Up Aiven MySQL Database

1. Go to https://console.aiven.io/signup
2. Sign up for a free account
3. Click "Create Service"
4. Select "MySQL"
5. Choose the free plan
6. Select a region close to you
7. Give it a name (e.g., "kodbank-db")
8. Click "Create Service"
9. Wait 5-10 minutes for the service to start
10. Click on the service to view connection details

## Step 2: Configure Database

1. Download the CA certificate from the Aiven service overview
2. Connect to your database using the provided connection string:
   ```
   mysql -h <host> -P <port> -u <user> -p <database>
   ```
3. Copy and paste the contents of `schema.sql` to create tables

## Step 3: Get Hugging Face API Key

1. Go to https://huggingface.co/join
2. Sign up for a free account
3. Go to Settings → Access Tokens
4. Click "New token"
5. Name it "kodbank" and select "Read" role
6. Click "Generate token"
7. Copy the token (starts with "hf_...")

## Step 4: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - DB_HOST: from Aiven (e.g., mysql-xxx.aivencloud.com)
   - DB_PORT: from Aiven (usually 12345)
   - DB_USER: from Aiven (usually avnadmin)
   - DB_PASSWORD: from Aiven
   - DB_NAME: from Aiven (usually defaultdb)
   - NEXTAUTH_SECRET: run `openssl rand -base64 32` to generate
   - NEXTAUTH_URL: https://your-app.vercel.app (will be provided after first deploy)
   - HUGGINGFACE_API_KEY: your Hugging Face token

6. Click "Deploy"
7. Wait for deployment to complete
8. Go back to environment variables and update NEXTAUTH_URL with your actual Vercel URL
9. Redeploy

## Step 5: Test Your Application

1. Visit your Vercel URL
2. Register a new account
3. Login
4. Verify the dashboard loads
5. Test the AI chat

## Troubleshooting

### "Connection refused" error
- Make sure your Aiven MySQL service is running
- Check that the host, port, and credentials are correct
- Verify SSL is enabled

### "Unauthorized" error in API routes
- Clear your browser cookies
- Make sure NEXTAUTH_SECRET is set in Vercel
- Try logging in again

### AI chat not working
- Verify HUGGINGFACE_API_KEY is correct
- Check Vercel logs for API errors
- The first response might take 10-20 seconds (model cold start)

### Database tables not found
- Make sure you ran the schema.sql script
- Connect to your database and verify tables exist:
  ```sql
  SHOW TABLES;
  ```

## Environment Variables Reference

```env
# From Aiven MySQL service overview
DB_HOST=mysql-xxx-xxx.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=xxxxxxxxxxxxx
DB_NAME=defaultdb

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-random-secret-here

# Your Vercel deployment URL
NEXTAUTH_URL=https://your-app.vercel.app

# From Hugging Face
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx
```

## Need Help?

- Check Vercel deployment logs for errors
- Verify all environment variables are set correctly
- Test database connection separately
- Check Hugging Face API status

## Local Development

To run locally:

1. Copy `.env.example` to `.env.local`
2. Fill in all environment variables
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000
