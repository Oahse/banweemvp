# Banwee - Premium African E-Commerce Platform

<div align="center">
  
  ![Banwee Logo](https://via.placeholder.com/200x80/4F46E5/FFFFFF?text=BANWEE)
  
  **Discover premium organic products from Africa**  
  *Ethically sourced, sustainably produced, and delivered to your doorstep*

  [![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
  [![Node](https://img.shields.io/badge/node-18+-green.svg)](https://nodejs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg)](https://fastapi.tiangolo.com/)
  [![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

  [Features](#-features) •
  [Quick Start](#-quick-start) •
  [Documentation](#-documentation) •
  [Architecture](#-architecture) •
  [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Banwee is a full-featured, production-ready e-commerce platform specializing in premium organic products from Africa. Built with modern technologies and best practices, it provides a complete solution for online retail with support for subscriptions, smart recommendations, automated scheduling, and comprehensive analytics.

### Why Banwee?

- **🌍 African Focus**: Specialized platform for African organic products
- **🚀 Production Ready**: Battle-tested with real-world usage
- **⚡ High Performance**: Async operations, Redis caching, optimized queries
- **🔒 Secure**: JWT auth, payment encryption, CORS protection
- **📱 Responsive**: Mobile-first design with dark mode support
- **🤖 Smart Features**: AI-powered recommendations, automated scheduling
- **📊 Analytics**: Comprehensive dashboards and reporting

---

## ✨ Features

### Customer Features
- 🛒 **Shopping Cart** - Real-time cart with stock validation
- 💳 **Secure Checkout** - Stripe integration with multiple payment methods
- 📦 **Order Tracking** - Real-time order status and shipping updates
- ⭐ **Product Reviews** - Rate and review purchased products
- ❤️ **Wishlist** - Save favorite products across devices
- 🔐 **Authentication** - Secure JWT-based auth with OAuth support
- 📧 **Email Notifications** - Automated order confirmations and updates
- 🔍 **Smart Search** - Advanced search with fuzzy matching and filters
- 🎯 **Recommendations** - AI-powered product recommendations (cross-sell, alternatives, social proof)
- 📱 **Responsive Design** - Optimized for all devices with dark mode

### Subscription Features
- 🔄 **Recurring Orders** - Automated subscription renewals
- 📅 **Flexible Scheduling** - Weekly, monthly, or custom billing cycles
- 💰 **Discount Management** - Apply and manage subscription discounts
- ⏸️ **Pause/Resume** - Full control over subscription lifecycle
- 📊 **Usage Tracking** - Monitor subscription history and costs
- 🔔 **Smart Notifications** - Automated renewal reminders and updates

### Admin Features
- 📊 **Analytics Dashboard** - Comprehensive sales, user, and product metrics
- 👥 **User Management** - Manage customers, suppliers, and admin accounts
- 📦 **Product Management** - Full CRUD with variants, images, and inventory
- 🏷️ **Promo Codes** - Create and manage discount codes with auto-scheduling
- 📈 **Sales Reports** - Export analytics in CSV and Excel formats
- 🎨 **Activity Logs** - Track all user actions and system events
- ⚙️ **System Settings** - Configure maintenance mode and features

### Technical Features
- 🚀 **Async Operations** - FastAPI with full async/await support
- 📧 **Email System** - Automated emails with beautiful templates
- 🎨 **Modern UI** - Tailwind CSS with custom theming
- 🔒 **Security** - JWT auth, password hashing, CORS, rate limiting
- 🧪 **Testing** - Comprehensive test coverage (80%+)
- 📝 **API Docs** - Auto-generated Swagger/ReDoc documentation
- 🤖 **Background Jobs** - ARQ worker for scheduled tasks
- 🔍 **Smart Recommendations** - Three-algorithm recommendation engine
- 📅 **Auto Scheduling** - Automated subscription and promocode management

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Lucide React icons, Framer Motion
- **Payment**: Stripe React SDK
- **Testing**: Vitest, React Testing Library

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 16 with SQLAlchemy 2.0 (async)
- **Caching**: Redis 7 (Upstash)
- **Background Tasks**: ARQ (async task queue)
- **Authentication**: JWT with python-jose
- **Email**: Mailgun API
- **Payment**: Stripe API
- **Testing**: Pytest with 80%+ coverage
- **Migrations**: Alembic (automatic on startup)
- **ASGI Server**: Uvicorn

### Infrastructure
- **Database**: Neon PostgreSQL (Cloud)
- **Cache**: Upstash Redis (Cloud)
- **Image CDN**: GitHub + jsDelivr
- **Deployment**: Docker-ready, cloud-native

---

## 📦 Prerequisites

### Required
- **Python 3.11+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)

### Cloud Services (Pre-configured)
- ✅ Neon PostgreSQL (database URL in `.env`)
- ✅ Upstash Redis (cache URL in `.env`)

### Optional Services
- Stripe account (for payment processing)
- Mailgun account (for email notifications)

**Note**: No local database installation required - cloud databases are pre-configured.

---

## 🚀 Quick Start

### One-Command Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/Oahse/banweemvp.git
cd banweemvp

# Start everything (database init + servers)
./start-app.sh
```

This script will:
1. ✅ Set up Python virtual environment
2. ✅ Install all dependencies
3. ✅ Initialize and seed the database
4. ✅ Start backend server (port 8000)
5. ✅ Start ARQ worker (background jobs)
6. ✅ Start frontend server (port 5173)

### Manual Setup

If you prefer step-by-step setup:

#### 1. Clone Repository
```bash
git clone https://github.com/Oahse/banweemvp.git
cd banweemvp
```

#### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python init_db.py

# Start backend server
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

#### 3. Start ARQ Worker (Required)
```bash
# In a new terminal
cd backend
source .venv/bin/activate
python start_arq_worker.py
```

**Important**: The ARQ worker must be running for:
- ✅ Subscription renewals (daily at 2 AM)
- ✅ Promocode auto-activation (daily at midnight)
- ✅ Background email sending
- ✅ Inventory synchronization

See [backend/README.md](backend/README.md) for detailed ARQ worker setup.

#### 4. Frontend Setup
```bash
# In a new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application

Once running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs (Swagger)**: http://localhost:8000/docs
- **API Docs (ReDoc)**: http://localhost:8000/redoc

### Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@banwee.com | admin123 |
| Supplier | supplier1@banwee.com | supplier1123 |
| Customer | customer1@example.com | customer1123 |

---

## 📁 Project Structure

```
banweemvp/
├── backend/                    # FastAPI backend
│   ├── api/                   # API route handlers (24 routers)
│   ├── core/                  # Core utilities (auth, db, config, cache)
│   ├── models/                # SQLAlchemy models (25 tables)
│   ├── schemas/               # Pydantic schemas for validation
│   ├── services/              # Business logic layer
│   │   ├── payments/         # Payment service + failure handler
│   │   ├── products/         # Product service + recommendations
│   │   ├── promocode/        # Promocode service + scheduler
│   │   └── subscriptions/    # Subscription service + scheduler
│   ├── tests/                 # Test suite (80%+ coverage)
│   ├── alembic/              # Database migrations
│   ├── logs/                 # Application logs
│   ├── main.py               # FastAPI app entry point
│   ├── init_db.py            # Database initialization script
│   ├── start_arq_worker.py   # ARQ worker startup script
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # Backend documentation
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── api/              # API client functions (23 modules)
│   │   ├── components/       # React components
│   │   │   ├── generic/     # Reusable components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── shared/      # Shared utilities
│   │   │   └── ui/          # UI components
│   │   ├── features/         # Feature modules
│   │   │   ├── public/      # Public pages (home, products, etc.)
│   │   │   └── protected/   # Protected pages (account, admin, etc.)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   └── types/            # TypeScript type definitions
│   ├── public/               # Static assets
│   ├── package.json          # Node.js dependencies
│   └── vite.config.ts        # Vite configuration
├── docs/                      # Documentation
├── .github/                   # GitHub Actions workflows
├── README.md                  # This file
└── start-app.sh              # One-command startup script
```

---

## 📚 Documentation

### Main Documentation
- **[Backend README](backend/README.md)** - Backend setup, ARQ worker, and API details
- **[API Documentation](http://localhost:8000/docs)** - Live Swagger UI (when running)
- **[Environment Setup](backend/.env.example)** - Environment variables guide

### Feature Documentation
- **[Subscription Flow](backend/SUBSCRIPTION_FLOW.md)** - Subscription system details
- **[Smart Recommendations](SMART_RECOMMENDATIONS_COMPLETE.md)** - Recommendation engine
- **[Promocode Scheduler](PROMOCODE_SCHEDULER_COMPLETE.md)** - Auto-scheduling system
- **[Payment Service](PAYMENT_SERVICE_REORGANIZATION.md)** - Payment processing

### Development Documentation
- **[API Cleanup](API_CLEANUP_SUMMARY.md)** - API analysis and cleanup
- **[Session Summary](SESSION_SUMMARY.md)** - Recent changes and updates
- **[Final Status](FINAL_IMPLEMENTATION_STATUS.md)** - Implementation status

---

## 💻 Development

### Running in Development Mode

```bash
# Backend (with auto-reload)
cd backend
source .venv/bin/activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# ARQ Worker (required)
python start_arq_worker.py

# Frontend (with HMR)
cd frontend
npm run dev
```

### Database Migrations

```bash
cd backend
source .venv/bin/activate

# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Check current version
alembic current

# View history
alembic history
```

### Code Quality

```bash
# Backend linting
cd backend
flake8

# Frontend linting
cd frontend
npm run lint

# Frontend type checking
npm run type-check
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
source .venv/bin/activate

# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=html

# Run specific test file
pytest tests/unit/test_auth_service.py

# Run with verbose output
pytest -v
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run specific test
npm test -- ProductCard.test.tsx
```

### Test Coverage

- **Backend**: 80%+ coverage
- **Frontend**: 75%+ coverage
- **Integration Tests**: Full API coverage

---

## 🚀 Deployment

### Production Build

#### Frontend
```bash
cd frontend
npm run build
# Output: frontend/dist/
# Deploy to: Vercel, Netlify, AWS S3, Cloudflare Pages
```

#### Backend
```bash
cd backend
# Use gunicorn with uvicorn workers
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
# Deploy to: AWS EC2, DigitalOcean, Railway, Heroku
```

### Environment Configuration

1. **Set production environment variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   # Edit with production values
   ```

2. **Configure CORS**
   ```env
   BACKEND_CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

3. **Enable HTTPS**
   - Use SSL/TLS certificates
   - Configure reverse proxy (Nginx, Caddy)

4. **Set up monitoring**
   - Application logs
   - Error tracking (Sentry)
   - Performance monitoring

### Recommended Hosting

- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Backend**: AWS EC2, DigitalOcean, Railway
- **Database**: Neon PostgreSQL (already configured)
- **Cache**: Upstash Redis (already configured)

---

## 🤝 Contributing

We welcome contributions! Here's how:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests**
5. **Run tests**
   ```bash
   cd backend && pytest
   cd frontend && npm test
   ```
6. **Commit changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation
- Use conventional commit messages
- Keep PRs focused and small

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

---

## 📧 Contact

- **GitHub**: [@Oahse](https://github.com/Oahse)
- **Repository**: [banweemvp](https://github.com/Oahse/banweemvp)
- **Issues**: [GitHub Issues](https://github.com/Oahse/banweemvp/issues)
- **Email**: support@banwee.com

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- FastAPI for the excellent async Python framework
- React team for the powerful UI library
- Stripe for secure payment processing
- Mailgun for reliable email delivery
- Neon for managed PostgreSQL
- Upstash for managed Redis
- All contributors who have helped improve this project

---

<div align="center">
  <p>Made with ❤️ by the Banwee Team</p>
  <p>
    <a href="#table-of-contents">⬆ Back to Top</a>
  </p>
</div>
