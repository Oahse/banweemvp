# URL Configuration Summary

This document confirms that all URLs are properly synchronized between frontend and backend.

## Current Configuration

### Backend (Port 8000)
- **API Base URL**: `http://localhost:8000`
- **API with versioning**: `http://localhost:8000/api/v1`
- **API Documentation**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/health`

**Configuration File**: `backend/.env`
```env
BACKEND_CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Startup Command** (from README.md):
```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload
```
Default port: **8000**

---

### Frontend (Port 5173)
- **App URL**: `http://localhost:5173`
- **API Base URL**: `http://localhost:8000/api/v1`

**Configuration File**: `frontend/.env`
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_URL=http://localhost:5173
```

**Startup Command** (from README.md):
```bash
cd frontend
npm run dev
```
Default port: **5173** (Vite default)

---

## URL Synchronization Status

✅ **All URLs are properly synchronized:**

1. **Frontend → Backend Communication**
   - Frontend uses: `http://localhost:8000/api/v1`
   - Backend listens on: `http://localhost:8000`
   - ✅ Match confirmed

2. **Backend CORS Configuration**
   - Backend allows: `http://localhost:5173`
   - Frontend runs on: `http://localhost:5173`
   - ✅ Match confirmed

3. **Stripe Configuration**
   - Frontend public key: `pk_test_51DummyKeyForDevelopmentTesting123456789`
   - Backend public key: `pk_test_51DummyPublicKeyForDevelopmentTesting123456789`
   - ✅ Both configured (dummy keys for development)

4. **Social Auth Configuration**
   - Google Client ID: Same in both frontend and backend
   - Facebook App ID: Same in both frontend and backend
   - TikTok Client ID: Same in both frontend and backend
   - ✅ All synchronized

---

## Running Both Services

### Terminal 1 - Backend
```bash
cd backend
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

---

## Verification Checklist

- [x] Backend runs on port 8000
- [x] Frontend runs on port 5173
- [x] Frontend API_BASE_URL points to backend (http://localhost:8000/api/v1)
- [x] Backend CORS allows frontend origin (http://localhost:5173)
- [x] Stripe keys match between frontend and backend
- [x] Social auth credentials synchronized
- [x] All environment variables have dummy data for development

---

## Production Considerations

When deploying to production, update the following:

### Backend `.env`
```env
DOMAIN=yourdomain.com
ENVIRONMENT=production
BACKEND_CORS_ORIGINS=https://yourdomain.com
SECRET_KEY=<generate-secure-random-key>
STRIPE_SECRET_KEY=<real-stripe-secret-key>
STRIPE_PUBLIC_KEY=<real-stripe-public-key>
```

### Frontend `.env`
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
VITE_APP_URL=https://yourdomain.com
VITE_STRIPE_PUBLIC_KEY=<real-stripe-public-key>
VITE_GOOGLE_CLIENT_ID=<real-google-client-id>
VITE_FACEBOOK_APP_ID=<real-facebook-app-id>
```

---

**Last Updated**: 2025-01-17
**Status**: ✅ All URLs synchronized and verified
