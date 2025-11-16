
# Cartify - Next.js E-commerce Platform

![Cartify Logo](./public/Logo.png)

Cartify is a modern, full-featured e-commerce platform built with Next.js 15 (App Router) and TypeScript. It provides a complete solution for online stores, including a customer-facing frontend, an admin dashboard for managing the store, and a robust backend with integrations for payments and image management.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Frontend](#frontend)
  - [Pages and Routes](#pages-and-routes)
  - [Main Components](#main-components)
  - [State Management](#state-management)
  - [User Flows](#user-flows)
- [Backend](#backend)
  - [API Routes](#api-routes)
  - [Database Models](#database-models)
  - [Authentication and Authorization](#authentication-and-authorization)
  - [Integrations](#integrations)
- [End-to-End Workflow](#end-to-end-workflow)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Known Limitations](#known-limitations)
- [Possible Improvements](#possible-improvements)

## Project Overview

Cartify is designed to be a scalable and customizable e-commerce solution. It offers a seamless shopping experience for users and a powerful set of tools for administrators. The project is built with a focus on performance, developer experience, and modern web technologies.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 15 (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [Radix UI](https://www.radix-ui.com/) for accessible components
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **Image Management:** [Cloudinary](https://cloudinary.com/)
- **API:** Next.js API Routes

## Folder Structure

The project follows a feature-based folder structure, with a clear separation of concerns between the frontend and backend.

```
/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication pages (sign-in, sign-up)
│   ├── (client)/         # Customer-facing pages
│   ├── admin/            # Admin dashboard pages
│   └── api/              # API routes
├── components/           # Reusable React components
│   ├── admin/            # Components for the admin dashboard
│   ├── auth/             # Authentication-related components
│   ├── checkout/         # Checkout form components
│   ├── common/           # Common components used across the app
│   ├── header/           # Header components
│   ├── pages/            # Page-specific components
│   ├── providers/        # React context providers
│   └── ui/               # UI components (buttons, inputs, etc.)
├── contexts/             # React context definitions
├── hooks/                # Custom React hooks
├── lib/                  # Server-side business logic and utilities
├── models/               # Mongoose database models
├── public/               # Static assets
├── store/                # Zustand store definitions
└── types/                # TypeScript type definitions
```

## Frontend

The frontend is built with React and Next.js, using a combination of Server Components and Client Components for optimal performance.

### Pages and Routes

- **Authentication:** `/sign-in`, `/sign-up`
- **Customer-facing:**
  - `/`: Homepage
  - `/shop`: Product listing page
  - `/product/[slug]`: Product details page
  - `/cart`: Shopping cart
  - `/checkout`: Checkout process
  - `/account`: User account management
- **Admin:**
  - `/admin`: Admin dashboard
  - `/admin/products`: Product management
  - `/admin/orders`: Order management
  - `/admin/categories`: Category management
  - `/admin/brands`: Brand management
  - `/admin/banners`: Banner management

### Main Components

- **`Header`:** The main navigation bar, including the logo, search bar, and account/cart icons.
- **`Footer`:** The footer section with links and contact information.
- **`ProductCard`:** A card component for displaying product information.
- **`ProductGrid`:** A grid layout for displaying a list of products.
- **`CartMenu`:** A dropdown menu for viewing the cart contents.
- **`CheckoutForm`:** The form for collecting shipping and payment information.

### State Management

- **Zustand:** Used for managing global state, such as the shopping cart and wishlist.
- **React Context:** Used for managing local state within specific parts of the application, such as the user's account and addresses.

### User Flows

1. **Browsing and Shopping:** Users can browse products, view product details, and add items to their cart.
2. **Checkout:** Users can proceed to the checkout, enter their shipping and payment information, and place an order.
3. **Account Management:** Users can create an account, view their order history, and manage their addresses.
4. **Admin Management:** Administrators can log in to the admin dashboard to manage products, orders, and other store settings.

## Backend

The backend is built with Next.js API Routes and MongoDB, providing a RESTful API for the frontend.

### API Routes

- **`/api/addresses`:** Manage user addresses.
- **`/api/banners`:** Manage promotional banners.
- **`/api/brands`:** Manage product brands.
- **`/api/categories`:** Manage product categories.
- **`/api/orders`:** Manage customer orders.
- **`/api/products`:** Manage products.
- **`/api/stripe`:** Handle Stripe payment processing.
- **`/api/upload`:** Handle file uploads to Cloudinary.
- **`/api/webdata`:** Manage general website data (about us, terms, etc.).
- **`/api/webhooks`:** Handle webhooks from Clerk and Stripe.

### Database Models

- **`Address`:** Stores user shipping addresses.
- **`Banner`:** Stores promotional banners.
- **`Brand`:** Stores product brands.
- **`Category`:** Stores product categories.
- **`Order`:** Stores customer orders.
- **`Product`:** Stores product information.
- **`UserProfile`:** Stores user profile information.
- **`WebData`:** Stores general website data.

### Authentication and Authorization

- **Clerk:** Used for user authentication and management.
- **Protected Routes:** The admin dashboard and user account pages are protected, requiring users to be authenticated.

### Integrations

- **Stripe:** Used for processing credit card payments.
- **Cloudinary:** Used for storing and serving product images and other media.

## End-to-End Workflow

1. A user visits the website and browses the products.
2. The user adds a product to their cart.
3. The user proceeds to the checkout and enters their shipping and payment information.
4. The frontend sends a request to the backend to create a Stripe payment intent.
5. The user completes the payment on the frontend.
6. The frontend sends a request to the backend to create an order in the database.
7. The backend confirms the order and sends a confirmation email to the user.
8. An administrator can view and manage the order in the admin dashboard.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/)
- [Clerk](https://clerk.com/) account
- [Stripe](https://stripe.com/) account
- [Cloudinary](https://cloudinary.com/) account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cartify.git
   ```
2. Install the dependencies:
   ```bash
   cd cartify
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```
# MongoDB
MONGODB_URI=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Known Limitations

- The current version does not support multiple languages or currencies.
- The admin dashboard has limited reporting and analytics features.

## Possible Improvements

- Add support for internationalization and localization.
- Implement a more advanced search functionality with filters and sorting.
- Add customer reviews and ratings for products.
- Integrate with a shipping provider for real-time shipping rates.
- Add a blog or content management system for marketing purposes.
