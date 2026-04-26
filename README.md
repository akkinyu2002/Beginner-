# CodeFromZero

CodeFromZero is a free learning platform MVP designed for both young learners and advanced students.

## Tech Stack
- Frontend: Next.js + Tailwind CSS + Monaco Editor
- Backend: Node.js + Express
- Testing: Jest + Testing Library + Supertest

## Project Structure
- `frontend/` - Next.js UI app
- `backend/` - Express API app
- `shared/content/` - Shared lesson JSON content

## Quick Start
1. Install dependencies:
   npm install
2. Start full stack:
   npm run dev
3. Frontend:
   http://localhost:3000
4. Backend:
   http://localhost:4000

## Scripts
- `npm run dev` - run frontend and backend
- `npm run test` - run backend and frontend tests
- `npm run lint` - run linters
- `npm run format` - run prettier
- `npm run pipeline` - lint, test, fix, commit automation
- `npm run pipeline -- --dry-run` - run pipeline checks without auto-commit

## API
- `GET /lesson` - returns lesson content from shared JSON file
