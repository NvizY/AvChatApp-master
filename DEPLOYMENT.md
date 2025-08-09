# AvChatApp Deployment Guide

## 🚀 Deploying to Render

This is a full-stack MERN chat application that needs to be deployed as two separate services on Render.

### 📋 Prerequisites

1. MongoDB Atlas account (for production database)
2. Render account
3. Git repository pushed to GitHub

### 🔧 Deployment Steps

#### 1. Deploy Backend (Web Service)

1. Go to Render Dashboard → New → Web Service
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `avchatapp-backend`
   - **Root Directory**: `Backend`
   - **Language**: Node
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (for testing) or Starter (for production)

4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   FRONTEND_ORIGIN=https://your-frontend-url.onrender.com
   ```

5. Set Health Check Path: `/health`

#### 2. Deploy Frontend (Static Site)

1. Go to Render Dashboard → New → Static Site
2. Connect your GitHub repository
3. Configure the site:
   - **Name**: `avchatapp-frontend`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   VITE_SOCKET_URL=https://your-backend-url.onrender.com
   ```

#### 3. Update Environment Variables

After both services are deployed:

1. Update the backend's `FRONTEND_ORIGIN` to point to your frontend URL
2. Update the frontend's `VITE_API_BASE_URL` and `VITE_SOCKET_URL` to point to your backend URL

### 🔑 Environment Variables Reference

#### Backend (.env)
```
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp
JWT_SECRET=your_jwt_secret_key_minimum_32_characters
FRONTEND_ORIGIN=https://your-frontend-app.onrender.com
NODE_ENV=production
```

#### Frontend (.env)
```
VITE_API_BASE_URL=https://your-backend-app.onrender.com
VITE_SOCKET_URL=https://your-backend-app.onrender.com
```

### 🏃‍♂️ Local Development

1. Create `.env` files based on `.env.example` files
2. Install dependencies:
   ```bash
   cd Backend && npm install
   cd ../Frontend && npm install
   ```
3. Start backend: `cd Backend && npm run dev`
4. Start frontend: `cd Frontend && npm run dev`

### 🐛 Troubleshooting

- **CORS errors**: Ensure `FRONTEND_ORIGIN` in backend matches your frontend URL
- **Socket connection issues**: Ensure `VITE_SOCKET_URL` matches your backend URL
- **API not found**: Ensure `VITE_API_BASE_URL` matches your backend URL
- **Database connection**: Ensure MongoDB URI is correct and network access is allowed

### 📝 Notes

- The backend runs on port 10000 in production (Render assigns this automatically)
- The frontend is served as static files (built with Vite)
- Socket.io connections work through the same backend URL
- Health check endpoint is available at `/health`
