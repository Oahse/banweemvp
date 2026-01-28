# Project Reorganization Plan

## Current Issues
- Complex file names and deep nesting
- Scattered related functionality
- Inconsistent naming conventions
- Too many small files that could be combined

## Proposed Structure

### Backend Reorganization

#### Current → New Structure
```
backend/
├── core/                    → lib/
│   ├── config.py           → config.py
│   ├── database.py         → db.py
│   ├── redis.py            → cache.py
│   ├── security/           → auth/
│   ├── exceptions/         → errors/
│   ├── middleware/         → middleware/
│   └── utils/              → utils/
├── models/                 → models/ (keep)
├── routes/                 → api/
├── services/               → services/ (keep)
├── schemas/                → schemas/ (keep)
├── tasks/                  → jobs/
└── tests/                  → tests/ (reorganize)
```

#### File Consolidation
- Combine small utility files
- Merge related exception handlers
- Consolidate middleware files
- Simplify test file names

### Frontend Reorganization

#### Current → New Structure
```
frontend/src/
├── components/
│   ├── common/             → ui/
│   ├── layout/             → layout/
│   ├── auth/               → auth/
│   ├── product/            → product/
│   ├── cart/               → cart/
│   ├── checkout/           → checkout/
│   ├── admin/              → admin/
│   └── account/            → account/
├── pages/                  → pages/ (keep)
├── hooks/                  → hooks/ (keep)
├── contexts/               → store/
├── apis/                   → api/
├── lib/                    → utils/
└── types/                  → types/ (keep)
```

#### File Simplification
- Rename complex component names
- Combine small utility files
- Merge related context providers
- Simplify API client files

### Configuration Files
```
Current                     → New
docker-compose.yml         → docker-compose.yml (keep)
docker-compose.prod.yml    → docker-prod.yml
.env.example               → env.example
backend/.env.local         → backend/.env
frontend/.env              → frontend/.env
```

## Implementation Steps

1. **Backend Reorganization**
   - Rename core/ to lib/
   - Move routes/ to api/
   - Rename tasks/ to jobs/
   - Consolidate utility files
   - Simplify test names

2. **Frontend Reorganization**
   - Rename contexts/ to store/
   - Move apis/ to api/
   - Rename lib/ to utils/
   - Consolidate UI components
   - Simplify component names

3. **Configuration Cleanup**
   - Simplify Docker file names
   - Consolidate environment files
   - Update import paths

4. **Testing & Validation**
   - Update all import statements
   - Test Docker builds
   - Verify API functionality
   - Check frontend routing

## Benefits
- Cleaner, more intuitive structure
- Easier navigation and maintenance
- Consistent naming conventions
- Reduced complexity
- Better developer experience