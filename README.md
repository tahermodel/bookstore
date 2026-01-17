# Objects of Permanence

A curated, editorial-style e-commerce experience for premium books and digital artifacts. Built with **Next.js 15**, **Tailwind CSS**, and **Stripe**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

## 📖 Overview

**Objects of Permanence** is designed as an antidote to the ephemeral nature of the modern web. It is a high-performance, minimal storefront that treats products as cultural artifacts.

The design prioritizes:
- **Typography**: Editorial-grade type handling using standard fonts.
- **Speed**: Instant page loads and smooth transitions.
- **Simplicity**: A distraction-free shopping experience.

## ✨ Features

- **Next.js App Router**: Utilizing the latest React Server Components for optimal performance.
- **Editorial Layout**: A unique, grid-based design system inspired by print media.
- **Stripe Checkout**: Secure and seamless payment processing.
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop.
- **Type-Safe**: Fully typed with TypeScript for robust development.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & PostCSS
- **Icons**: Lucide React
- **Payments**: Stripe Node.js SDK

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/book-store.git
   cd book-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Stripe credentials:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add your Environment Variables (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`) in the Vercel dashboard.
4. Deploy!

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
