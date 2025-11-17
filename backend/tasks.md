
2. fix errors in calculating product details page. -

7. fix the (payments and wishlists and cart and subscriptions, profile, dashboard , dashboard counts) in frontend and backend
# Project Refactoring and Cleanup Tasks

## Backend

- [x] **Dependency Analysis:** Review and update `backend/requirements.txt`.
- [ ] **Linting:** Run `flake8` and fix all linting issues.
- [ ] **Code Cleanup:**
    - [ ] Review and refactor `backend/main.py`.
    - [ ] Review and refactor `backend/routes`.
    - [ ] Review and refactor `backend/models`.
    - [ ] Review and refactor `backend/schemas`.
    - [ ] Review and refactor `backend/services`.
    - [ ] Remove unused files and code.
    - [ ] Add fastapi background tasks for some services were needed
- [ ] **API and Model Validation:**
    - [ ] Ensure consistency between SQLAlchemy models and Pydantic schemas.
    - [ ] Verify API routes are using correct schemas and services.

## Frontend

- [ ] **Dependency Analysis:** Review and update `frontend/package.json`.
- [ ] **Linting:** Run ESLint and fix all linting issues.
- [ ] **JavaScript to TypeScript Migration:**
    - [ ] Rename `.js`/`.jsx` files to `.ts`/`.tsx`.
    - [ ] Add TypeScript and type definitions.
    - [ ] Fix type errors.
- [ ] **API Client Review:** Ensure frontend API calls match backend endpoints.
- [ ] **Fix All calculation details:** fix errors in calculating product details page.
- [ ] **Fix all Pages:** fix the (payments and wishlists and cart and subscriptions, profile, dashboard , dashboard counts) in frontend and backend
- [ ] **Component Refactoring:** Review and improve React components.
- [ ] **Remove Unused Files:** Identify and remove unused frontend files and code.

## General

- [ ] **GitHub Commits:** Push changes to GitHub with descriptive messages after each major task.
