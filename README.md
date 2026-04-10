# Uptown Restaurant Platform

A premium, bilingual (Arabic/English) restaurant ordering system built with Next.js, Supabase, and Lahza Payment Gateway.

## 🚀 Getting Started

### 1. Environment Setup
Copy `.env.example` to `.env.local` and fill in your credentials:
```bash
cp .env.example .env.local
```

### 2. Installations
```bash
npm install
```

### 3. Database Seeding
To initialize your database with the default menu, categories, and branches:
1. Set a secret `ADMIN_KEY` in your `.env.local`.
2. Visit: `http://localhost:3000/api/seed?key=YOUR_ADMIN_KEY`

### 4. Running Locally
```bash
npm run dev
```

## 🔒 Security & Deployment

### GitHub Guidelines
- **NEVER** push your `.env` or `.env.local` files to GitHub. They are listed in `.gitignore` by default.
- Use the provided `.env.example` to guide your production environment setup.

### Supabase Security
- **Enable RLS**: Go to your Supabase Dashboard -> Database -> Policies and ensure **Row Level Security (RLS)** is enabled for all tables.
- **Service Role Key**: The `SUPABASE_SERVICE_ROLE_KEY` should ONLY be used in the `.env` file and never exposed in client-side code.

### Payment Integration
- This project uses **Lahza** for production payments. Ensure your webhook secrets are correctly configured in your deployment environment to prevent spoofing.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Vanilla CSS (Custom Premium Design)
- **Payments**: Lahza Gateway