# Editorial | Curated Book Store

A premium e-commerce experience for curated books and digital artifacts. Built with **Next.js 15**, **Prisma 7**, **Auth.js v5**, and **Stripe**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

## ✨ Features

- **Modern Tech Stack**: Next.js 15 App Router with Turbopack.
- **Glassmorphism UI**: Premium "snowed glass" aesthetic across the header and profile sections.
- **Full Auth System**: Secure authentication via Auth.js v5 (formerly NextAuth) using Google OAuth and Email/Password.
- **Verified Email Updates**: Users can update their email addresses with a secure verification code flow.
- **Stripe Integration**: Complete checkout flow for digital/physical products.
- **Robust Database**: Powered by Prisma 7 and Supabase with optimized connection handling for Vercel.
- **Nodemailer Integration**: Reliable transactional emails using Gmail SMTP.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15)
- **Database**: [Supabase](https://supabase.com/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Auth.js v5](https://authjs.dev/)
- **Payments**: [Stripe](https://stripe.com/)
- **Email**: [Nodemailer](https://nodemailer.com/) (Gmail SMTP)
- **Styling**: Tailwind CSS 4 & Lucide Icons

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/tahermodel/bookstore.git
cd bookstore
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add the following:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_URL=http://localhost:3000

# Database (Supabase)
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."

# Auth
AUTH_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."

# Email (Gmail SMTP)
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-16-character-app-password"
```

### 4. Database Sync
```bash
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```

## 📦 Deployment

This project is optimized for deployment on **Vercel**. 

1. **Prisma Generation**: The project includes a `postinstall` script to ensure Prisma Client is generated correctly in CI/CD environments.
2. **SSL Configuration**: Database connections are pre-configured to handle Supabase certificate chains on serverless platforms.
3. **Authorized Redirects**: Ensure you add your production URL (e.g., `https://your-app.vercel.app/api/auth/callback/google`) to your Google Cloud Console credentials.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
