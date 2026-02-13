# Simple Deployment - Two Servers

## Setup

You need 2 servers and they both connect to the same database and Redis.

### Server 1: FastAPI Backend (API Only)

```bash
# Clone code
git clone your-repo
cd backend

# Install dependencies
pip install -r requirements.txt

# Set .env file
DATABASE_URL=postgresql+asyncpg://user:pass@your-db-host:5432/dbname
REDIS_URL=redis://your-redis-host:6379/0
ARQ_REDIS_URL=redis://your-redis-host:6379/1
STRIPE_SECRET_KEY=sk_...

# Run FastAPI (NO worker starts)
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Server 2: ARQ Worker (Background Tasks Only)

```bash
# Clone same code
git clone your-repo
cd backend

# Install dependencies
pip install -r requirements.txt

# Set SAME .env file (same database, same Redis)
DATABASE_URL=postgresql+asyncpg://user:pass@your-db-host:5432/dbname
REDIS_URL=redis://your-redis-host:6379/0
ARQ_REDIS_URL=redis://your-redis-host:6379/1
STRIPE_SECRET_KEY=sk_...

# Run ARQ Worker using your script
python start_arq_worker.py
```

## That's It!

- **Server 1** runs FastAPI only (handles HTTP requests)
- **Server 2** runs ARQ worker only (processes background jobs and subscriptions)
- Both connect to the same PostgreSQL and Redis
- They communicate through Redis queue
- NO background tasks start with FastAPI - everything is handled by `start_arq_worker.py`

The ARQ worker will automatically process subscriptions daily at 2 AM.
