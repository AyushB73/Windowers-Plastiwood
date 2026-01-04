# 🏢 Plastiwood Inventory Management System

Multi-user inventory management and billing system with GST compliance, payment tracking, and mobile app support.

## ✨ Features

- 📦 **Inventory Management** - Real-time stock tracking with alerts
- 💰 **Sales & Billing** - GST-compliant invoices with PDF generation
- 🛒 **Purchase Tracking** - Supplier management and stock updates
- 💳 **Payment Tracking** - Paid/Pending/Partial status with amount tracking
- 📊 **Dashboard** - Analytics and insights (Owner only)
- 👥 **Multi-User** - Role-based access (Owner & Staff)
- 📱 **Mobile App** - Installable PWA for iOS & Android

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database

Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/plastiwood
JWT_SECRET=plastiwood-secret-key
PORT=3000
```

### 3. Start Server
```bash
npm start
```

### 4. Open App
```
http://localhost:3000
```

**Login:**
- **Pramod** (Owner) - Full access
- **Sandeep** (Staff) - View inventory, make sales

## 🌐 Multi-User Setup

For multi-user access from different devices, deploy to cloud:

### Render (Recommended - Easiest)
1. Push code to GitHub
2. Go to https://render.com/
3. Create Web Service from GitHub
4. Build: `npm install`
5. Start: `npm start`
6. Add MongoDB database
7. Done!

### Railway (24/7 Uptime)
1. Push code to GitHub
2. Go to https://railway.app/
3. Deploy from GitHub
4. Add MongoDB database
5. Done!

**📖 Full guide:** See `SETUP_GUIDE.md`

## 📱 Install as Mobile App

**iOS:** Safari → Share → Add to Home Screen  
**Android:** Chrome → Menu → Install App

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** HTML, CSS, JavaScript
- **Features:** PWA, PDF generation, Real-time sync

## 📁 Project Structure

```
├── public/
│   ├── index.html       # Main app
│   ├── login.html       # Login page
│   ├── app.js           # App logic
│   ├── auth.js          # Authentication
│   ├── api-service.js   # API calls
│   └── styles.css       # Styling
├── server.js            # Express server
├── package.json         # Dependencies
└── .env                 # Environment variables
```

## 👥 User Roles

**Pramod (Owner):**
- Full access to all features
- Dashboard, inventory, sales, purchases
- Add/edit/delete items

**Sandeep (Staff):**
- View inventory
- Make sales and generate bills
- No dashboard or purchase access

## 📞 Support

See `SETUP_GUIDE.md` for deployment help.

---

**Version:** 2.0.0 | **Status:** Production Ready
