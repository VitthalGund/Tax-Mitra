# TaxMitra

TaxMitra is an AI-assisted tax guidance and filing web app focused on Indian taxation. It combines guided tax data collection, personalized recommendations, and an in-app chatbot for tax questions.

## Product Overview (Non-Technical)

### What problem TaxMitra solves
- Tax filing is complex and stressful for most individuals.
- Many users miss deductions and filing opportunities.
- People need quick tax guidance without waiting for manual consultations.

### Who it is for
- Individual taxpayers who want guided filing and savings suggestions.
- Early-stage business users exploring digital tax support.
- Users who need quick answers about Indian tax rules.

### Core product journey
1. **Sign up / sign in** with secure authentication.
2. **Start a tax session** and choose user type.
3. **Enter personal and income details** in a guided multi-step flow.
4. **Review recommendations and summary** before finalizing.
5. **Ask the AI chatbot** tax questions anytime.
6. **Optionally schedule a call** using the built-in video call page.

### Value proposition
- Simpler filing flow through guided steps.
- AI-backed tax assistance and recommendations.
- Centralized experience for profile, tax data, and advisory support.

---

## Current Feature Set (Grounded in Code)

- **Landing page with product sections**: hero, features, how-it-works, testimonials, CTA (`/src/app/page.jsx`, `/src/components/home/*`).
- **Authentication with Clerk**: custom sign-in/sign-up pages and protected routes (`/src/app/sign-in/page.jsx`, `/src/app/sign-up/page.jsx`, `/src/middleware.js`).
- **Guided tax form flow** for:
  - User type
  - Personal information
  - Income categories: salary, services, business, investments, other
  - Preview and recommendations
  (`/src/app/tax-form/[id]/**`).
- **AI chatbot endpoint** for Indian tax Q&A (`/src/app/api/chatbot/route.js`) used by `/src/app/bot.jsx`.
- **Tax records and recommendations APIs** (`/src/app/api/tax-records/**`).
- **User profile APIs** (`/src/app/api/users/route.js`).
- **Schedule-a-call page** using Zego UIKit (`/src/app/Schedule-a-Call/page.jsx`).
- **Language selector hook integration** in navbar (`/src/components/Navbar.jsx`, `/src/hooks/useGoogleTranslate.js`).

> Note: The user type UI shows “Corporate”, but it is currently disabled in the flow (`/src/app/tax-form/[id]/user-type/page.jsx`).

---

## Developer Documentation

### Tech stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Clerk authentication
- MongoDB + Mongoose
- Google Generative AI SDK
- Zod + React Hook Form

### Prerequisites
- Node.js 20+ recommended
- npm (lockfile is present)
- Clerk project keys
- MongoDB connection string
- Gemini API key
- (Optional) Zego credentials for video calling

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Fill `.env.local` with real values.
4. Start the app:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`.

### Available scripts
From `package.json`:
- `npm run dev` – start local dev server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – run Next.js ESLint checks

### Environment variables used by the app
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `MONGO_URL`
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_APP_ID` (Zego)
- `NEXT_PUBLIC_SERVER_SEC` (Zego)

### API routes
- `POST /api/chatbot` – AI tax assistant query.
- `GET /api/users` – list users.
- `POST /api/users` – create user (email + gender).
- `PUT /api/users` – update user profile by email.
- `GET /api/tax-records` – list tax records.
- `POST /api/tax-records` – create tax record and generate recommendations.
- `GET /api/tax-records/[uui]` – fetch a tax record by `uui`.

### Repository structure
- `/src/app` – routes, pages, API handlers
- `/src/components` – UI and feature components
- `/src/models` – Mongoose models
- `/src/lib` and `/src/app/lib` – DB connection helpers
- `/src/context` – global form context
- `/AI` – standalone Python experimentation/training artifacts

---

## Important Notes for Contributors

- README now reflects current scripts and App Router file layout (`page.jsx`, not `app/page.js`).
- Keep `.env.example` secret-free and placeholder-only.
- If you add new environment variables or scripts, update this README in the same PR.
