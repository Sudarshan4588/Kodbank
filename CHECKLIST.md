# 📋 Deployment Checklist

Use this checklist to ensure everything is set up correctly.

## ✅ Pre-Deployment

### Database Setup
- [ ] Created Aiven account at https://console.aiven.io
- [ ] Created MySQL service (free Hobbyist-2 plan)
- [ ] Service is running (green status indicator)
- [ ] Noted down connection details:
  - [ ] Host
  - [ ] Port
  - [ ] User
  - [ ] Password
  - [ ] Database name
- [ ] Ran schema.sql to create tables
- [ ] Verified tables exist (users, transactions, user_stats, chat_messages)

### Hugging Face Setup
- [ ] Created account at https://huggingface.co
- [ ] Created API token with "Read" access
- [ ] Copied token (starts with hf_...)

### Code Repository
- [ ] Code pushed to GitHub
- [ ] Repository is public or Vercel has access

## ✅ Vercel Deployment

### Initial Setup
- [ ] Connected GitHub repo to Vercel
- [ ] Added all environment variables:
  - [ ] DB_HOST
  - [ ] DB_PORT
  - [ ] DB_USER
  - [ ] DB_PASSWORD
  - [ ] DB_NAME
  - [ ] NEXTAUTH_SECRET (generated random string)
  - [ ] NEXTAUTH_URL (temporary, will update)
  - [ ] HUGGINGFACE_API_KEY
- [ ] Clicked "Deploy"
- [ ] Deployment succeeded (no errors)

### Post-Deployment
- [ ] Copied Vercel app URL
- [ ] Updated NEXTAUTH_URL environment variable with actual URL
- [ ] Redeployed the application
- [ ] Second deployment succeeded

## ✅ Testing

### Registration & Login
- [ ] Visited app URL
- [ ] Registered new account
- [ ] Received success message
- [ ] Redirected to login page
- [ ] Logged in with new credentials
- [ ] Redirected to dashboard

### Dashboard
- [ ] Dashboard loads correctly
- [ ] Stats cards show data:
  - [ ] Total Balance: $45,231.89
  - [ ] Monthly Income: $8,432.50
  - [ ] Monthly Expenses: $3,120.45
  - [ ] Total Savings: $12,450
- [ ] Recent transactions displayed (4 sample transactions)
- [ ] All UI elements visible and styled correctly

### AI Chat
- [ ] Clicked "AI Chat" button in sidebar
- [ ] Chat panel opened on the right
- [ ] Sent a test message
- [ ] Received AI response (might take 10-20 seconds first time)
- [ ] Chat history persists

### Navigation
- [ ] Logout button works
- [ ] Redirected to login after logout
- [ ] Can login again
- [ ] Protected routes work (can't access /dashboard when logged out)
- [ ] Auth routes redirect (can't access /login when logged in)

## ✅ Production Verification

### Security
- [ ] Passwords are hashed (can't see plain text in database)
- [ ] JWT tokens are httpOnly
- [ ] Environment variables not exposed in browser
- [ ] Database connection uses SSL

### Performance
- [ ] Pages load in < 3 seconds
- [ ] No console errors
- [ ] Mobile responsive (test on phone)
- [ ] AI chat responds (might be slow on first use)

### Monitoring
- [ ] Check Vercel Analytics (optional)
- [ ] Check Vercel Logs for any errors
- [ ] Test from different devices/browsers

## 🚨 Common Issues & Fixes

### "Internal Server Error" on login
- **Fix**: Check database connection details
- **Verify**: Aiven service is running
- **Check**: Vercel logs for specific error

### "Unauthorized" when accessing dashboard
- **Fix**: Clear browser cookies
- **Fix**: Regenerate NEXTAUTH_SECRET
- **Check**: Token is being set in cookies

### AI chat doesn't respond
- **Wait**: First response takes 10-20 seconds
- **Check**: Hugging Face API key is correct
- **Check**: You have API quota remaining
- **Try**: Send another message

### Database connection failed
- **Check**: Aiven service is running
- **Verify**: All DB_ environment variables are correct
- **Test**: Connect using MySQL client
- **Check**: SSL is enabled

### Tables not found
- **Fix**: Run schema.sql in your database
- **Verify**: Connect to DB and run `SHOW TABLES;`
- **Check**: You're connected to the correct database

## 📊 Final Verification

Run through this complete user flow:

1. Visit app → Should redirect to /login
2. Click "Sign up" → Go to /register
3. Register new account → Success message
4. Login with new account → Redirect to /dashboard
5. View dashboard → All stats visible
6. Click on transaction → See details
7. Open AI chat → Send message → Get response
8. Logout → Redirect to /login
9. Try to access /dashboard → Redirect to /login

If all these work: **You're done! 🎉**

## 🎯 Next Steps After Deployment

- [ ] Test with multiple accounts
- [ ] Customize the design/colors
- [ ] Add more features
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics (optional)
- [ ] Add error monitoring (optional)

## 📝 Notes

- Keep your database credentials secure
- Never commit .env.local to git
- Regularly check Vercel logs for errors
- Monitor your Hugging Face API usage
- Aiven free tier has some limitations (check their docs)

---

**Need Help?**
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables
4. Test database connection separately
5. Review QUICKSTART.md and README.md
