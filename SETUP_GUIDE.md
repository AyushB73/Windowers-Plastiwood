# 🚀 Plastiwood Multi-User Setup Guide

## What You Need

Your app is ready for multi-user access. You just need a cloud database.

---

## Option 1: Render (Recommended - Easiest)

### Why Render?
- ✅ Simplest setup (3 steps)
- ✅ Free forever
- ✅ Automatic MongoDB included
- ✅ No configuration files needed

### Steps:

**1. Push code to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**2. Deploy on Render:**
- Go to: https://render.com/
- Sign up with GitHub
- Click "New +" → "Web Service"
- Connect your repository
- Settings:
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Instance Type**: Free
- Click "Create Web Service"

**3. Add MongoDB:**
- In Render dashboard, click "New +" → "MongoDB"
- Name: `plastiwood-db`
- Plan: Free
- Click "Create Database"
- Copy the connection string
- Go to your Web Service → Environment tab
- Add variable:
  - Key: `MONGODB_URI`
  - Value: (paste connection string)
- Save

**Done!** Your app is live at: `https://your-app.onrender.com`

---

## Option 2: Railway

### Why Railway?
- ✅ No sleep time (24/7 uptime)
- ✅ 500 free hours/month
- ✅ Automatic MongoDB

### Steps:

**1. Push code to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**2. Deploy on Railway:**
- Go to: https://railway.app/
- Sign up with GitHub
- Click "New Project" → "Deploy from GitHub repo"
- Select your repository
- Wait for deployment

**3. Add MongoDB:**
- Click "+ New" → "Database" → "MongoDB"
- Railway automatically connects it
- Done!

**Your app is live!** Railway provides a URL.

---

## Option 3: MongoDB Atlas (Manual)

If you want to use your own MongoDB:

**1. Create MongoDB Atlas account:**
- Go to: https://cloud.mongodb.com/
- Sign up (free)
- Create a free cluster (M0)

**2. Get connection string:**
- Click "Connect" → "Connect your application"
- Copy the connection string
- Replace `<password>` with your password

**3. Update your app:**
- Create `.env` file in your project:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/plastiwood
  JWT_SECRET=plastiwood-secret-key
  PORT=3000
  ```

**4. Run locally:**
```bash
npm start
```

**5. Deploy to any platform** (Render/Railway/Vercel)

---

## After Deployment

### Test Multi-User:

**Device 1 (Your Computer):**
1. Open your deployed URL
2. Login as Pramod
3. Add an inventory item

**Device 2 (Your Phone):**
1. Open the same URL
2. Login as Sandeep
3. You should see the item Pramod added!

**✅ If you see the item = Multi-user is working!**

### Install as Mobile App:

**iOS:**
1. Open URL in Safari
2. Tap Share → "Add to Home Screen"
3. Tap "Add"

**Android:**
1. Open URL in Chrome
2. Tap Menu → "Install App"
3. Tap "Install"

---

## Troubleshooting

### "Cannot connect to database"
- Check `MONGODB_URI` is set correctly
- Ensure MongoDB is running
- Check connection string format

### "App not loading"
- Wait 30-60 seconds (free tier wakes up)
- Check deployment logs
- Ensure build succeeded

### "Data not syncing"
- Clear browser cache
- Check you're using the same database
- Verify MongoDB connection in logs

---

## What's Included

Your app has:
- ✅ Inventory management
- ✅ Sales & billing with GST
- ✅ Purchase tracking
- ✅ Payment status (Paid/Pending/Partial)
- ✅ PDF invoice generation
- ✅ Dashboard (Owner only)
- ✅ Multi-user support
- ✅ Role-based access:
  - **Pramod** (Owner) - Full access
  - **Sandeep** (Staff) - View inventory, make sales only

---

## Quick Reference

**Local Development:**
```bash
npm install
npm start
# Open http://localhost:3000
```

**Deploy to Render:**
```bash
git push origin main
# Then deploy on render.com
```

**Deploy to Railway:**
```bash
git push origin main
# Then deploy on railway.app
```

---

## Need Help?

- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app/
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/

---

**Recommendation:** Start with Render - it's the simplest and free forever!
