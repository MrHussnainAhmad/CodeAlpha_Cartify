# E-Commerce Shop - Complete Project Documentation
## Final Year Project - Full Stack E-Commerce Platform

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Design](#architecture--design)
4. [Database Schema](#database-schema)
5. [Authentication & Authorization](#authentication--authorization)
6. [Admin Panel Features](#admin-panel-features)
7. [User Features & Workflows](#user-features--workflows)
8. [Payment System](#payment-system)
9. [Cart & Discount System](#cart--discount-system)
10. [Image Management](#image-management)
11. [API Endpoints](#api-endpoints)
12. [Frontend Components](#frontend-components)
13. [State Management](#state-management)
14. [Important Implementation Details](#important-implementation-details)
15. [Environment Configuration](#environment-configuration)
16. [Deployment & Setup](#deployment--setup)
17. [Bug Fixes & Improvements](#bug-fixes--improvements)
18. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

### What is This Project?
A full-stack, modern e-commerce platform built with Next.js 15, featuring a complete admin panel for store management and a customer-facing storefront. The platform supports product catalog management, dynamic pricing with deals and coupons, integrated payment processing, and comprehensive order management.

### Key Highlights
- **Full-Stack Application**: Complete backend and frontend in Next.js
- **Real Payment Processing**: Stripe integration for secure payments
- **Cloud Image Storage**: Cloudinary for image hosting and optimization
- **Modern Authentication**: Clerk for user authentication and management
- **Complex Discount System**: Multiple discount types (product discounts, deals, coupons, vouchers)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Dynamic content management without redeployment
- **MongoDB Database**: NoSQL database for flexible data storage

### Project Purpose
This is a final year project demonstrating enterprise-level e-commerce functionality including inventory management, payment processing, user authentication, order tracking, and admin controls.

---

## 💻 Technology Stack

### Frontend Technologies
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications

### Backend Technologies
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB 8.17.0** (Mongoose) - NoSQL database with ODM
- **Clerk** - Authentication and user management
- **Stripe** - Payment processing
- **Cloudinary** - Image upload and storage
- **Multer** - File upload handling

### State Management & Data Fetching
- **Zustand 5.0.7** - Lightweight state management
- **Zustand Persist** - Cart persistence in localStorage
- **Server Components** - Next.js server-side rendering
- **API Route Handlers** - RESTful API design

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control
- **PowerShell** - Development environment (Windows)

---

## 🏗 Architecture & Design

### Application Structure
```
shop2/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages (sign-in, sign-up)
│   ├── (client)/                 # Customer-facing pages
│   │   ├── page.tsx              # Home page
│   │   ├── shop/                 # Product listing
│   │   ├── cart/                 # Shopping cart
│   │   ├── checkout/             # Checkout process
│   │   ├── deal/                 # Deal products
│   │   ├── compare/              # Product comparison
│   │   ├── FavItems/             # Favorites/Wishlist
│   │   └── account/              # User account pages
│   ├── admin/                    # Admin panel
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── products/             # Product management
│   │   ├── categories/           # Category management
│   │   ├── brands/               # Brand management
│   │   ├── banner/               # Banner management
│   │   ├── orders/               # Order management
│   │   ├── brandsection/         # Brand section settings
│   │   └── webdata/              # Website data management
│   ├── api/                      # API routes (App Router)
│   │   ├── addresses/            # Address management
│   │   ├── stripe/               # Stripe payment routes
│   │   └── webdata/              # Web data routes
│   ├── layout.tsx                # Root layout with Clerk provider
│   └── globals.css               # Global styles
├── pages/api/                    # Pages Router API (legacy)
│   ├── products/                 # Product CRUD
│   ├── categories/               # Category CRUD
│   ├── brands/                   # Brand CRUD
│   ├── banners/                  # Banner CRUD
│   ├── orders/                   # Order management
│   ├── upload/                   # Image upload
│   ├── user/                     # User profile
│   └── vouchers/                 # Voucher management
├── components/                   # React components
│   ├── admin/                    # Admin panel components
│   ├── common/                   # Shared components
│   ├── header/                   # Header components
│   ├── pages/                    # Page-specific components
│   ├── checkout/                 # Checkout flow
│   ├── providers/                # Context providers
│   └── ui/                       # UI primitives (shadcn/ui)
├── models/                       # MongoDB Mongoose models
│   ├── Product.js
│   ├── Category.js
│   ├── Brand.js
│   ├── Banner.js
│   ├── Order.js
│   ├── Address.js
│   ├── UserProfile.js
│   └── WebData.js
├── lib/                          # Utility libraries
│   ├── db.js                     # MongoDB connection
│   ├── api.ts                    # API client functions
│   ├── stripe.ts                 # Stripe configuration
│   └── cloudinary.js             # Cloudinary configuration
├── store/                        # Zustand stores
├── types/                        # TypeScript type definitions
├── hooks/                        # Custom React hooks
├── middleware.ts                 # Clerk middleware
└── .env.local                    # Environment variables
```

### Design Patterns Used

#### 1. **Server-Side Rendering (SSR)**
- Most pages use Next.js server components for optimal performance
- Data fetching happens on the server before rendering
- SEO-friendly with pre-rendered content

#### 2. **API Route Pattern**
- RESTful API design with proper HTTP methods (GET, POST, PUT, DELETE)
- Centralized database connection handling
- Error handling and validation

#### 3. **Component Composition**
- Reusable components with clear separation of concerns
- Client components ("use client") only when needed for interactivity
- Server components by default for better performance

#### 4. **State Management Pattern**
- Zustand for global state (shopping cart)
- Local state (useState) for component-specific data
- Server state managed through Next.js data fetching

#### 5. **Repository Pattern**
- Mongoose models act as data access layer
- Business logic separated from data access
- Clean separation between API routes and database operations

---

## 🗄 Database Schema

### MongoDB Collections Overview
The application uses 8 main collections with relationships between them.

### 1. **Products Collection**
```javascript
{
  _id: ObjectId,
  name: String,                    // Product name
  slug: String (unique),           // URL-friendly identifier
  description: String,             // Product description
  originalPrice: Number,           // Base price
  discount: Number,                // Regular discount percentage
  price: Number,                   // Calculated price after discount
  sku: String,                     // Stock keeping unit
  images: [String],                // Array of Cloudinary URLs
  category: ObjectId (ref: Category),
  brand: ObjectId (ref: Brand),
  stock: Number,                   // Available quantity
  status: String,                  // 'New', 'Sale', etc.
  variant: String,                 // Product variant info
  isFeatured: Boolean,             // Featured on homepage
  customAttributes: [{
    name: String,
    value: String
  }],
  coupon: {
    name: String,                  // Coupon code
    value: Number                  // Discount percentage
  },
  isOnDeal: Boolean,               // Special deal status
  dealPercentage: Number,          // Additional deal discount
  tags: [String],
  createdAt: Date
}
```

**Key Features:**
- Support for multiple images per product
- Flexible discount system (regular discount + deal discount)
- Product-specific coupon codes
- Custom attributes for specifications
- Category and brand relationships

### 2. **Categories Collection**
```javascript
{
  _id: ObjectId,
  name: String (unique),
  slug: String (unique),
  description: String,
  image: String,                   // Cloudinary URL
  imageUrl: String,                // Alternative image field
  parent: ObjectId (ref: Category), // For nested categories
  featured: Boolean,               // Show on homepage
  createdAt: Date
}
```

**Key Features:**
- Hierarchical category structure (parent-child)
- Featured categories for homepage display
- Image support for category banners

### 3. **Brands Collection**
```javascript
{
  _id: ObjectId,
  name: String (unique),
  slug: String (unique),
  logo: String,                    // Cloudinary URL
  logoUrl: String,                 // Alternative logo field
  description: String,
  website: String,
  featured: Boolean,
  voucher: {
    name: String,                  // Voucher code
    value: Number                  // Discount percentage
  },
  createdAt: Date
}
```

**Key Features:**
- Brand-specific voucher codes (apply to all brand products)
- Logo image support
- Featured brands section

### 4. **Orders Collection**
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: UserProfile),
  products: [{
    product: ObjectId (ref: Product),
    quantity: Number
  }],
  total: Number,                   // Total amount paid
  status: String,                  // 'pending', 'processing', 'on_way', 
                                   // 'about_to_deliver', 'shipped', 
                                   // 'delivered', 'cancelled'
  shippingAddress: ObjectId (ref: Address),
  createdAt: Date
}
```

**Key Features:**
- Multiple products per order
- Comprehensive order status tracking
- Reference to shipping address
- User relationship for order history

### 5. **UserProfile Collection**
```javascript
{
  _id: ObjectId,
  clerkId: String (unique, sparse), // Clerk authentication ID
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  addresses: [{                     // Embedded addresses (deprecated)
    name: String,
    email: String,
    streetAddress: String,
    apartment: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String,
    isDefault: Boolean
  }],
  createdAt: Date
}
```

**Key Features:**
- Integration with Clerk authentication
- Support for email-based users (without Clerk)
- Sparse unique index allows null clerkId values

### 6. **Address Collection**
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: UserProfile),
  name: String,
  email: String,
  streetAddress: String,
  apartment: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  phone: String,
  isDefault: Boolean
}
```

**Key Features:**
- Separate collection for better address management
- Multiple addresses per user
- Default address selection
- Used for shipping and billing

### 7. **Banner Collection**
```javascript
{
  _id: ObjectId,
  title: String,
  name: String,
  description: String,
  slug: String,
  badge: String,                   // Badge text (e.g., "50% OFF")
  discountAmount: Number,
  image: String,                   // Cloudinary URL
  imageUrl: String,
  link: String,                    // CTA link
  isMiniBanner: Boolean,           // Main vs mini banner
  createdAt: Date
}
```

**Key Features:**
- Support for main banners and mini banners
- Flexible content management
- Direct links for call-to-actions

### 8. **WebData Collection**
```javascript
{
  _id: ObjectId,
  aboutUs: String,                 // Rich text content
  terms: String,                   // Terms and conditions
  privacy: String,                 // Privacy policy
  faqs: String,                    // FAQ content
  help: String,                    // Help content
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String
  },
  contactInfo: {
    visitUs: String,
    callUs: String,
    emailUs: String,
    workingHours: String
  },
  logo: String,                    // Site logo URL
  storeName: String,
  sectionSettings: {
    shopByBrandsVisible: Boolean   // Toggle sections
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Key Features:**
- Centralized website content management
- No need to redeploy for content changes
- Social media integration
- Section visibility controls

### Database Relationships
```
UserProfile (1) ----< (N) Address
UserProfile (1) ----< (N) Order
Order (1) ----< (N) OrderProducts (M) ----> (1) Product
Product (N) ----> (1) Category
Product (N) ----> (1) Brand
Order (N) ----> (1) Address (shipping)
```

---

## 🔐 Authentication & Authorization

### Authentication System (Clerk)

#### Overview
The application uses **Clerk** for complete authentication and user management. Clerk provides:
- Email/password authentication
- OAuth providers (Google, GitHub, etc.)
- User management dashboard
- Session management
- Security features (2FA, passwordless)

#### Implementation

**1. Clerk Configuration** (`middleware.ts`)
```typescript
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/",                           // Homepage
    "/shop/(.*)",                  // Product browsing
    "/product/(.*)",               // Product details
    "/api/banners",                // Public APIs
    "/api/categories/(.*)",
    "/api/brands/(.*)",
    "/api/products/(.*)",
    "/aboutus", "/contactus",      // Static pages
    "/faqs", "/help", "/privacy", "/terms"
  ],
});
```

**2. Layout Wrapper** (`app/layout.tsx`)
```typescript
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

**3. Protected Routes**
- `/admin/*` - Admin panel (no specific admin check, relies on route protection)
- `/account/*` - User account pages
- `/checkout` - Checkout process
- `/FavItems` - User favorites

**4. API Route Protection**
```typescript
import { auth } from '@clerk/nextjs/server';

export async function POST(request) {
  const { userId } = auth(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Process request...
}
```

### User Management Flow

#### 1. **User Registration**
```
User Signs Up → Clerk Creates Account → Webhook Triggers → 
UserProfile Created in MongoDB → Redirect to Account Page
```

#### 2. **User Login**
```
User Signs In → Clerk Authenticates → Session Created → 
Access to Protected Routes → UserProfile Loaded from DB
```

#### 3. **User-Database Sync**
```javascript
// Webhook endpoint: /api/webhooks/clerk
// Syncs Clerk users with MongoDB UserProfile
app.api.webhooks.clerk.route.ts

Events handled:
- user.created
- user.updated
- user.deleted
```

### Authorization Levels

#### Public Access (No Auth Required)
- Browse products
- View categories and brands
- Read static pages
- Search functionality
- View banners

#### Authenticated Users
- Add to cart (persists across sessions)
- Manage addresses
- Place orders
- View order history
- Update profile
- Save favorites
- Apply coupons/vouchers

#### Admin Access
- All authenticated user features
- Product management (CRUD)
- Category management
- Brand management
- Banner management
- Order management (update status)
- Web data management
- Image uploads

**Note:** Current implementation doesn't have explicit admin role checking. Admin access is controlled through route protection and should be enhanced with role-based access control (RBAC) in production.

### Session Management
- Sessions handled by Clerk
- Automatic token refresh
- Secure cookie-based sessions
- Client-side session state via `useUser()` hook
- Server-side session via `auth()` function

---

## 🛠 Admin Panel Features

### Admin Dashboard (`/admin`)
The admin panel provides complete control over the e-commerce platform.

#### Dashboard Overview
- Quick access to all management sections
- Product, category, brand, banner management links
- Order management
- Brand section visibility toggle
- Website content management

### 1. **Product Management** (`/admin/products`)

#### Features:
- **View All Products**: Paginated list with search and filters
- **Add New Product**: Comprehensive product creation form
- **Edit Product**: Update any product detail
- **Delete Product**: Remove products from catalog
- **Image Management**: Multiple image uploads per product

#### Product Form Fields:
```
- Product Name (required)
- Slug (auto-generated from name)
- Description (rich text support)
- Original Price (required)
- Regular Discount (% off original price)
- SKU (Stock Keeping Unit)
- Stock Quantity
- Product Status (New, Sale, etc.)
- Variant Information
- Category (dropdown, required)
- Brand (dropdown, required)
- Featured Product Toggle
- Custom Attributes (key-value pairs)
  - Example: Color: Red, Size: Large
- Product Images (multiple upload)
- Coupon Code (optional)
  - Coupon Name
  - Discount Percentage
- Deal Settings
  - Is On Deal Toggle
  - Deal Percentage (additional discount)
- Tags (comma-separated)
```

#### How Products Work:
1. Admin uploads images → Cloudinary stores them → URLs saved in DB
2. Product created with category/brand references
3. Discount calculation:
   - Base discount applied to original price
   - Deal discount applied on top (compound)
   - Final price = originalPrice × (1 - discount/100) × (1 - dealPercentage/100)
4. Product appears on frontend immediately
5. Stock decreases when orders are placed

#### Product List Features:
- Search by name/description
- Filter by category
- Filter by featured products
- Filter by deal products
- Quick edit button
- Delete with confirmation
- Image preview
- Price display with discounts

### 2. **Category Management** (`/admin/categories`)

#### Features:
- **Add Category**: Name, slug, description, image
- **Edit Category**: Update category details
- **Delete Category**: Remove with warning if products exist
- **Featured Categories**: Mark for homepage display
- **Category Image**: Upload category banner image

#### Category Form:
```
- Category Name (unique, required)
- Slug (auto-generated)
- Description
- Category Image (Cloudinary upload)
- Parent Category (for nested categories)
- Featured Toggle
```

#### Usage:
- Categories organize products
- Used in shop filters
- Featured categories show on homepage
- Hierarchical structure supported (parent-child)

### 3. **Brand Management** (`/admin/brands`)

#### Features:
- **Add Brand**: Name, logo, description, voucher
- **Edit Brand**: Update brand information
- **Delete Brand**: Remove with product check
- **Brand Vouchers**: Create brand-wide discount codes
- **Featured Brands**: Display in "Shop by Brands" section

#### Brand Form:
```
- Brand Name (unique, required)
- Slug (auto-generated)
- Brand Logo (Cloudinary upload)
- Description
- Website URL
- Featured Toggle
- Brand Voucher
  - Voucher Code Name
  - Discount Percentage (applies to all brand products)
```

#### Brand Voucher System:
- Users can apply brand vouchers in cart
- Discount applies to all regular products (non-deal) from that brand
- Vouchers stored in `/api/vouchers` endpoint
- Format: `{ "BRAND10": { discount: 10, brandName: "BrandName" } }`

### 4. **Banner Management** (`/admin/banner`)

#### Features:
- **Create Banners**: Main homepage banners
- **Create Mini Banners**: Smaller promotional banners
- **Edit Banners**: Update content and images
- **Delete Banners**: Remove banners
- **Banner Links**: Set call-to-action URLs

#### Banner Types:
1. **Main Banners**: Large hero banners on homepage
2. **Mini Banners**: Smaller promotional banners

#### Banner Form:
```
- Title (required)
- Name/Subtitle
- Description
- Slug (for URL if needed)
- Badge Text (e.g., "50% OFF")
- Discount Amount
- Banner Image (Cloudinary, required)
- Link URL (CTA destination)
- Banner Type (Main/Mini)
```

#### Banner Display:
- Main banners: Carousel on homepage
- Mini banners: Grid layout below main content
- Responsive design
- Click-through to product pages or custom URLs

### 5. **Order Management** (`/admin/orders`)

#### Features:
- **View All Orders**: Complete order list with details
- **Order Details**: Customer info, items, amounts
- **Update Order Status**: Multi-stage fulfillment tracking
- **Payment Status**: View payment success/failure
- **Customer Information**: Email, user ID, shipping address

#### Order Status Workflow:
```
Processing → On Way → About to Deliver → Delivered
                ↓
            Cancelled
```

#### Order Status Options:
1. **Processing**: Order received, preparing for shipment
2. **On Way**: Order shipped, in transit
3. **About to Deliver**: Out for delivery
4. **Delivered**: Successfully delivered
5. **Cancelled**: Order cancelled

#### Payment Status Options:
- **Succeeded**: Payment successful
- **Failed**: Payment failed
- **Canceled**: Payment cancelled

#### Order Information Displayed:
```
- Order ID (Payment Intent ID)
- Creation Date
- Customer Email
- User ID
- Order Items (with quantities and prices)
- Subtotal
- Shipping Cost
- Total Amount
- Currency
- Payment Status
- Order Status (Fulfillment)
- Shipping Address (if available)
```

#### Admin Actions:
- Update payment summary (paid/failed/canceled)
- Update payment status
- Update order/fulfillment status
- Real-time status updates without page refresh

### 6. **Brand Section Management** (`/admin/brandsection`)

#### Features:
- **Toggle Brand Section**: Show/hide "Shop by Brands" on homepage
- **Section Visibility Control**: Manage homepage sections

#### Usage:
- Controls visibility of brand carousel on homepage
- Useful for seasonal promotions or A/B testing
- Changes reflect immediately

### 7. **Web Data Management** (`/admin/webdata`)

#### Features:
- **About Us**: Rich text editor for company information
- **Terms & Conditions**: Legal terms
- **Privacy Policy**: Privacy statement
- **FAQs**: Frequently asked questions
- **Help**: Support information
- **Contact Information**: Address, phone, email, hours
- **Social Media Links**: Facebook, Twitter, Instagram, LinkedIn, YouTube
- **Site Logo**: Upload company logo
- **Store Name**: Set store name

#### Web Data Form:
```
- About Us (textarea/rich text)
- Terms and Conditions (textarea)
- Privacy Policy (textarea)
- FAQs (textarea)
- Help/Support (textarea)
- Contact Info:
  - Visit Us (address)
  - Call Us (phone)
  - Email Us
  - Working Hours
- Social Links:
  - Facebook URL
  - Twitter URL
  - Instagram URL
  - LinkedIn URL
  - YouTube URL
- Logo Upload (Cloudinary)
- Store Name
- Section Settings:
  - Shop by Brands Visible (toggle)
```

#### Benefits:
- No code deployment needed for content changes
- Centralized content management
- Consistent branding across site
- Easy updates to legal documents
- Social media integration

### 8. **Image Upload System**

#### Cloudinary Integration:
```javascript
// Upload endpoint: /api/upload/image
// Uses Multer + Cloudinary Storage

Features:
- Multi-file upload support
- Automatic image optimization
- CDN delivery
- Format conversion (WebP, etc.)
- Responsive image URLs
- Folder organization (shop2_banners/)
```

#### Upload Process:
1. Admin selects image file
2. Frontend sends POST to `/api/upload/image`
3. Multer processes file upload
4. Cloudinary stores and optimizes image
5. Returns Cloudinary URL
6. URL saved in MongoDB with product/category/brand

#### Image Management:
- All images stored in Cloudinary (not on server)
- Automatic thumbnails and responsive versions
- Fast CDN delivery worldwide
- No storage limit concerns
- Easy image replacement

---

## 👥 User Features & Workflows

### 1. **Homepage** (`/`)

#### Components Displayed:
- **Hero Banner Carousel**: Main promotional banners
- **Category Grid**: Featured categories with images
- **Featured Products**: Grid of featured products
- **Shop by Brands**: Brand carousel (if enabled)
- **Mini Banners**: Promotional mini banners

#### User Actions:
- Browse featured products
- Click categories to filter
- Click banners for promotions
- Add products to cart from homepage
- Navigate to product details

### 2. **Shop Page** (`/shop`)

#### Features:
- **Product Grid**: All products with filtering
- **Filters**:
  - Category filter (sidebar)
  - Brand filter
  - Price range slider
  - Deal products only
  - Sort options (price, name, newest)
- **Search**: Real-time product search
- **Pagination**: Infinite scroll or page numbers
- **Add to Cart**: Quick add from grid

#### User Workflow:
```
Visit Shop → Apply Filters → Search Products → 
View Product Card → Add to Cart or View Details
```

### 3. **Product Detail Page** (`/product/[slug]`)

#### Information Displayed:
- **Product Images**: Gallery with zoom
- **Product Name & SKU**
- **Price Information**:
  - Original price (strikethrough if discounted)
  - Regular discount
  - Deal discount (if applicable)
  - Final price
  - Savings amount
- **Stock Status**: In stock / Out of stock
- **Product Description**: Full details
- **Category & Brand**: Links to filtered views
- **Custom Attributes**: Specifications table
- **Coupon Information**: Available coupon codes
- **Quantity Selector**
- **Add to Cart Button**
- **Share Button**: Share on social media
- **Product Badges**: Deal badge, discount badge

#### User Actions:
- View multiple images
- Select quantity
- Add to cart with quantity
- Apply product coupon code
- Share product
- View related products
- Compare products

### 4. **Shopping Cart** (`/cart`)

#### Cart Features:
- **Item List**: All cart items with images
- **Quantity Controls**: Increase/decrease quantity
- **Remove Items**: Delete from cart
- **Price Display**:
  - Original price
  - Product discount
  - Deal discount
  - Coupon discount (if applied)
  - Final price per item
  - Subtotal per item
- **Coupon Application**:
  - Product-specific coupons
  - Input field per product
  - Applied coupon indicator
  - Remove coupon option
- **Voucher Application**:
  - Brand voucher codes
  - Global voucher input
  - Discount calculation
  - Voucher info display
- **Cart Summary**:
  - Items count
  - Subtotal (before coupons)
  - Coupon discounts
  - Voucher discount
  - Total savings
  - Final total
- **Shipping Information**:
  - Delivery address selection
  - Default address display
  - Add new address link
- **Checkout Button**

#### Cart Workflow:
```
View Cart → Adjust Quantities → Apply Coupons/Vouchers → 
Select/Add Address → Proceed to Checkout
```

#### Cart Persistence:
- Cart stored in localStorage (Zustand persist)
- Survives page refreshes
- Available across browser sessions
- Syncs across tabs
- No authentication required to view cart
- Authentication required for checkout

### 5. **Discount System Details**

#### Types of Discounts:

**A. Product Discount (Regular)**
- Set by admin on product
- Applies to original price
- Always active when set
- Example: 20% off original price

**B. Deal Discount**
- Special promotional discount
- Applies on top of regular discount (compound)
- Highlighted with "DEAL" badge
- Products with deals cannot use coupons
- Example: 10% deal on already 20% discounted price
- Calculation: `finalPrice = originalPrice × 0.8 × 0.9`

**C. Product Coupon**
- Product-specific coupon code
- User must enter code in cart
- Applies after product discount
- Cannot be used with deal products
- Example: "SAVE15" for additional 15% off

**D. Brand Voucher**
- Applies to all non-deal products from a brand
- Global cart-level discount
- User enters voucher code
- Example: "NIKE10" for 10% off all Nike products

#### Discount Priority & Rules:
```
1. Original Price: $100
2. Product Discount (20%): $100 → $80
3. Deal Discount (10%): $80 → $72 (if deal product)
   OR
   Product Coupon (15%): $80 → $68 (if regular product)
4. Voucher (10%): Applied to subtotal of non-deal items
```

#### Important Discount Rules:
- ✅ Product discount + Deal discount = Allowed
- ✅ Product discount + Product coupon = Allowed
- ✅ Regular products + Voucher = Allowed
- ❌ Deal products + Coupon = Not allowed
- ❌ Deal products + Voucher = Not allowed
- ❌ Product coupon + Voucher = Both can apply separately

### 6. **Checkout Process** (`/checkout`)

#### Prerequisites:
- User must be authenticated (Clerk)
- Cart must have items
- Valid payment intent created

#### Checkout Flow:
```
Cart → Click Checkout → Authentication Check → 
Create Payment Intent → Load Checkout Form → 
Enter Shipping Info → Enter Payment Details → 
Submit Payment → Webhook Creates Order → 
Redirect to Success Page
```

#### Checkout Form Elements:

**1. Order Summary (Left Side)**
- Cart items with quantities
- Item prices
- Subtotal
- Shipping cost ($10 fixed)
- Total amount

**2. Checkout Form (Right Side)**
- **Email Input**: Required for receipt
- **Shipping Address**:
  - Stripe AddressElement
  - Name, Street, City, State, ZIP, Country, Phone
- **Billing Address**:
  - Same as shipping (default)
  - Or enter different address
- **Payment Method**:
  - Stripe PaymentElement
  - Credit card, debit card
  - Saved payment methods
  - Card details (number, expiry, CVC)

#### Payment Processing:
1. User enters all information
2. Clicks "Pay Now" button
3. Stripe validates payment method
4. Payment processed securely
5. Webhook triggered on success
6. Order created in database
7. Stock reduced for purchased items
8. User redirected to success page
9. Cart cleared

#### Success Page Features:
- Order confirmation message
- Payment intent ID
- Next steps information
- Link to order history

### 7. **User Account** (`/account`)

#### Account Sections:

**A. Account Dashboard** (`/account/account`)
- User information display
- Quick links to sections
- Recent orders summary
- Profile completion status

**B. Order History** (`/account/orders`)
- List of all orders
- Order details:
  - Order ID
  - Date placed
  - Items ordered
  - Total amount
  - Order status
  - Payment status
- Track order button
- Order status badge

**C. Address Book** (`/account/addresses`)
- View all saved addresses
- Add new address form:
  - Name
  - Email
  - Street address
  - Apartment/Suite
  - City
  - State/Province
  - Postal code
  - Country
  - Phone
  - Set as default checkbox
- Edit existing addresses
- Delete addresses
- Set default address
- Use address in checkout

**D. Profile Settings** (`/account/edit`)
- Edit personal information
- Update email (Clerk managed)
- Change password (Clerk managed)
- Update phone number
- Profile picture (Clerk managed)

### 8. **Search & Discovery**

#### Search Functionality:
- **Global Search Bar**: Header search
- **Real-time Results**: As-you-type suggestions
- **Search Scope**: Product names and descriptions
- **Search API**: `/api/products?searchTerm=query`

#### Product Discovery Features:
- **Category Browsing**: Click category to filter
- **Brand Browsing**: View all brand products
- **Featured Products**: Curated selection
- **Deal Products**: Special deal page `/deal`
- **New Arrivals**: Latest products
- **Related Products**: On product detail page

### 9. **Favorites/Wishlist** (`/FavItems`)

#### Features:
- Save favorite products
- View saved items grid
- Add to cart from favorites
- Remove from favorites
- Share wishlist

### 10. **Product Comparison** (`/compare`)

#### Features:
- Compare up to 3-4 products
- Side-by-side comparison table
- Compare prices, specs, features
- Add to cart from comparison
- Clear comparison

### 11. **Static Pages**

#### Available Pages:
- **About Us** (`/aboutus`): Company information
- **Contact Us** (`/contactus`): Contact form and information
- **FAQs** (`/faqs`): Frequently asked questions
- **Help** (`/help`): Customer support
- **Privacy Policy** (`/privacy`): Privacy terms
- **Terms of Service** (`/terms`): Terms and conditions

#### Contact Form:
- Name, Email, Subject, Message
- EmailJS integration for form submission
- Toast notification on success/error
- Contact information display

---

## 💳 Payment System

### Stripe Integration Overview

The application uses **Stripe** for secure payment processing with full webhook integration for order management.

### Payment Flow Architecture

```
User Cart → Checkout Page → Create Payment Intent → 
Stripe Payment Form → User Enters Card → Submit Payment → 
Stripe Processes → Webhook Triggered → Order Created → 
Stock Reduced → Success Page
```

### Implementation Details

#### 1. **Stripe Configuration** (`lib/stripe.ts`)
```typescript
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Client-side Stripe
export const getStripe = () => {
  return loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
};

// Server-side Stripe
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  { apiVersion: '2023-10-16' }
);
```

#### 2. **Create Payment Intent** (`/api/stripe/create-payment-intent`)

**Purpose**: Creates a Stripe payment intent before user enters card details

**Request Body**:
```json
{
  "items": [
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "shipping": {
    "cost": 10.00
  },
  "email": "user@example.com"
}
```

**Process**:
1. Receives cart items and shipping info
2. Calculates total amount
3. Creates Stripe PaymentIntent with metadata
4. Returns client secret for Stripe Elements
5. Stores order info in payment intent metadata

**Response**:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

#### 3. **Checkout Form** (`components/checkout/CheckoutForm.tsx`)

**Features**:
- Stripe Elements integration
- Payment Element (card input)
- Address Element (shipping/billing)
- Email input for receipt
- Order summary display
- Real-time validation
- Error handling
- Loading states

**Key Components**:
```typescript
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Payment confirmation
const { error, paymentIntent } = await stripe.confirmPayment({
  elements,
  confirmParams: {
    return_url: `${window.location.origin}/checkout/success`,
    receipt_email: email,
  },
  redirect: 'if_required'
});
```

#### 4. **Stripe Webhook** (`/api/stripe/webhook`)

**Purpose**: Handles payment events from Stripe securely

**Events Handled**:
- `payment_intent.succeeded` - Payment successful
- `payment_intent.payment_failed` - Payment failed
- `payment_intent.canceled` - Payment canceled

**Webhook Signature Verification**:
```typescript
import { verifyStripeSignature } from '@/lib/stripe';

const body = await request.text();
const signature = request.headers.get('stripe-signature');
const event = verifyStripeSignature(body, signature);
```

**Payment Success Handler**:
```typescript
async function handlePaymentSuccess(paymentIntent) {
  // 1. Extract metadata
  const { id, amount, metadata, receipt_email } = paymentIntent;
  const items = JSON.parse(metadata.items);
  const userId = metadata.userId;
  const email = receipt_email || metadata.email;
  
  // 2. Find or create user profile
  let userProfile = await UserProfile.findOne({ email });
  if (!userProfile) {
    userProfile = await UserProfile.create({ 
      email, 
      clerkId: userId 
    });
  }
  
  // 3. Create shipping address document
  const shippingAddress = await Address.create({
    user: userProfile._id,
    // ... address details from metadata
  });
  
  // 4. Create order
  const order = await Order.create({
    user: userProfile._id,
    products: items.map(i => ({
      product: i.id,
      quantity: i.quantity
    })),
    total: amount / 100,
    status: 'processing',
    shippingAddress: shippingAddress._id
  });
  
  // 5. Reduce stock
  await reduceProductStock(items);
  
  return order;
}
```

**Stock Reduction**:
```typescript
async function reduceProductStock(items) {
  for (const item of items) {
    await Product.findByIdAndUpdate(
      item.id,
      { $inc: { stock: -item.quantity } }
    );
  }
}
```

### Payment Security

#### Security Measures:
1. **PCI Compliance**: Stripe handles card data (never touches server)
2. **Webhook Signatures**: Verifies requests from Stripe
3. **HTTPS Only**: All payment requests over HTTPS
4. **Idempotency**: Prevents duplicate orders
5. **Metadata Validation**: Validates all payment data
6. **Amount Verification**: Server calculates amount (not client)

#### Environment Variables:
```env
# Public key (client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Secret key (server-side only)
STRIPE_SECRET_KEY=sk_test_xxx

# Webhook secret (webhook verification)
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### Payment Intent Metadata

**Stored in Payment Intent**:
```json
{
  "userId": "clerk_user_id",
  "email": "user@example.com",
  "items": "[{\"id\":\"prod_id\",\"name\":\"Product\",\"quantity\":2}]",
  "subtotal": "89.99",
  "shippingCost": "10.00",
  "shippingAddress": "{\"name\":\"John Doe\",\"address\":{...}}"
}
```

**Why Metadata?**
- Webhook receives full order context
- No database lookups needed during payment
- Reliable order creation even if API fails
- Audit trail in Stripe dashboard

### Testing Payments

#### Stripe Test Cards:
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155

Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

#### Localhost Webhook Testing:
```bash
# Install Stripe CLI
stripe login

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Use webhook signing secret from CLI output
```

### Payment Error Handling

#### Error Types:
1. **Card Errors**: Invalid card, insufficient funds
2. **API Errors**: Network issues, timeout
3. **Webhook Errors**: Signature verification failed
4. **Database Errors**: Order creation failed

#### User Feedback:
- Toast notifications for all errors
- Specific error messages
- Retry mechanisms
- Fallback order creation endpoint

### Order Processing Flow

#### After Successful Payment:
1. ✅ Payment captured by Stripe
2. ✅ Webhook received and verified
3. ✅ User profile created/found
4. ✅ Shipping address saved
5. ✅ Order document created
6. ✅ Product stock reduced
7. ✅ User redirected to success page
8. ✅ Cart cleared
9. ✅ Order visible in admin panel
10. ✅ Order appears in user's order history

### Fallback Mechanisms

#### Manual Order Processing:
If webhook fails (rare), there's a fallback endpoint:

**Endpoint**: `/api/orders/process-payment`

Called from checkout form after payment success:
```typescript
await fetch('/api/orders/process-payment', {
  method: 'POST',
  body: JSON.stringify({
    items,
    paymentIntentId,
    subtotal,
    shippingCost,
    email,
    shippingAddress,
    billingAddress
  })
});
```

This ensures orders are created even if webhook delivery fails.

---

## 🛒 Cart & Discount System

### Cart State Management (Zustand)

#### Store Configuration (`store.ts`)
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  product: Product;
  quantity: number;
  appliedCoupon?: {
    code: string;
    discount: number;
  };
}

interface StoreState {
  items: CartItem[];
  appliedVoucher: {
    code: string;
    discount: number;
    brandName?: string;
  } | null;
  // ... methods
}

const useCartStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedVoucher: null,
      // Implementation...
    }),
    { name: 'cart-storage' }
  )
);
```

### Cart Operations

#### 1. **Add to Cart**
```typescript
addItem: (product: Product) => {
  const items = get().items;
  const existingItem = items.find(
    item => item.product._id === product._id
  );
  
  if (existingItem) {
    // Increment quantity
    set({
      items: items.map(item =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    });
  } else {
    // Add new item
    set({ items: [...items, { product, quantity: 1 }] });
  }
}
```

#### 2. **Update Quantity**
```typescript
updateQuantity: (productId: string, quantity: number) => {
  if (quantity <= 0) {
    get().removeItem(productId);
    return;
  }
  
  set({
    items: get().items.map(item =>
      item.product._id === productId
        ? { ...item, quantity }
        : item
    )
  });
}
```

#### 3. **Remove Item**
```typescript
removeItem: (productId: string) => {
  set({
    items: get().items.filter(
      item => item.product._id !== productId
    )
  });
}
```

#### 4. **Clear Cart**
```typescript
clearCart: () => {
  set({ items: [], appliedVoucher: null });
}
```

### Price Calculation Logic

#### Individual Item Price
```typescript
getItemPrice: (item: CartItem) => {
  const originalPrice = item.product.originalPrice || 0;
  
  // Step 1: Apply product discount
  const productDiscount = item.product.discount || 0;
  let price = originalPrice * (1 - productDiscount / 100);
  
  // Step 2: Check if on deal
  if (item.product.isOnDeal && item.product.dealPercentage) {
    // Apply deal discount (compound)
    price = price * (1 - item.product.dealPercentage / 100);
    return price; // Deal products can't use coupons
  }
  
  // Step 3: Apply coupon if any (non-deal only)
  if (item.appliedCoupon) {
    price = price * (1 - item.appliedCoupon.discount / 100);
  }
  
  return Math.max(0, price);
}
```

#### Total Cart Price
```typescript
getTotalPrice: () => {
  const items = get().items;
  
  // Separate deal and regular products
  const dealTotal = items
    .filter(item => item.product.isOnDeal)
    .reduce((total, item) => {
      return total + (get().getItemPrice(item) * item.quantity);
    }, 0);
  
  let regularTotal = items
    .filter(item => !item.product.isOnDeal)
    .reduce((total, item) => {
      return total + (get().getItemPrice(item) * item.quantity);
    }, 0);
  
  // Apply voucher to regular items only
  const voucher = get().appliedVoucher;
  if (voucher && regularTotal > 0) {
    regularTotal = regularTotal * (1 - voucher.discount / 100);
  }
  
  return dealTotal + regularTotal;
}
```

### Coupon System

#### Product-Specific Coupons

**Apply Coupon to Item**:
```typescript
applyCouponToItem: (productId: string, couponCode: string) => {
  const item = get().items.find(i => i.product._id === productId);
  
  // Validation checks
  if (!item) {
    return { success: false, message: "Product not in cart" };
  }
  
  if (item.product.isOnDeal) {
    return {
      success: false,
      message: "Deal products cannot use coupons"
    };
  }
  
  if (!item.product.coupon?.name || !item.product.coupon?.value) {
    return {
      success: false,
      message: "No coupon available for this product"
    };
  }
  
  if (item.product.coupon.name.toUpperCase() !== 
      couponCode.toUpperCase()) {
    return {
      success: false,
      message: "Invalid coupon code"
    };
  }
  
  // Apply coupon
  set({
    items: get().items.map(cartItem =>
      cartItem.product._id === productId
        ? {
            ...cartItem,
            appliedCoupon: {
              code: couponCode.toUpperCase(),
              discount: item.product.coupon.value
            }
          }
        : cartItem
    )
  });
  
  return {
    success: true,
    message: `Coupon applied! ${item.product.coupon.value}% off`,
    discount: item.product.coupon.value
  };
}
```

**Remove Coupon**:
```typescript
removeCouponFromItem: (productId: string) => {
  set({
    items: get().items.map(item =>
      item.product._id === productId
        ? { ...item, appliedCoupon: undefined }
        : item
    )
  });
}
```

### Voucher System

#### Brand Vouchers

**Voucher API** (`/api/vouchers`):
```javascript
export default async function handler(req, res) {
  await dbConnect();
  
  try {
    // Fetch all brands with vouchers
    const brands = await Brand.find({
      'voucher.name': { $exists: true, $ne: null }
    });
    
    // Build voucher object
    const vouchers = {};
    brands.forEach(brand => {
      if (brand.voucher?.name && brand.voucher?.value) {
        vouchers[brand.voucher.name.toUpperCase()] = {
          discount: brand.voucher.value,
          brandName: brand.name,
          brandId: brand._id
        };
      }
    });
    
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vouchers' });
  }
}
```

**Apply Voucher**:
```typescript
applyVoucher: async (voucherCode: string) => {
  const items = get().items;
  
  // Check if cart has non-deal products
  const regularItems = items.filter(item => !item.product.isOnDeal);
  if (regularItems.length === 0) {
    return {
      success: false,
      message: 'Vouchers cannot be applied to deal products'
    };
  }
  
  try {
    // Fetch valid vouchers
    const response = await fetch('/api/vouchers');
    const validVouchers = await response.json();
    
    const voucherInfo = validVouchers[voucherCode.toUpperCase()];
    
    if (!voucherInfo) {
      return { success: false, message: 'Invalid voucher code' };
    }
    
    if (get().appliedVoucher?.code === voucherCode.toUpperCase()) {
      return { success: false, message: 'Voucher already applied' };
    }
    
    set({
      appliedVoucher: {
        code: voucherCode.toUpperCase(),
        discount: voucherInfo.discount,
        brandName: voucherInfo.brandName
      }
    });
    
    return {
      success: true,
      message: `${voucherInfo.discount}% off from ${voucherInfo.brandName}`
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to apply voucher'
    };
  }
}
```

**Remove Voucher**:
```typescript
removeVoucher: () => {
  set({ appliedVoucher: null });
}
```

### Discount Rules Summary

| Discount Type | Applies To | Can Combine With | Priority |
|--------------|------------|------------------|----------|
| Product Discount | All products | All | 1st |
| Deal Discount | Deal products | Product discount only | 2nd |
| Product Coupon | Non-deal products | Product discount, Voucher | 2nd/3rd |
| Brand Voucher | Non-deal regular items | Product discount, Coupon | 3rd/4th |

### Cart UI Components

#### Cart Icon (`components/header/Carticon.tsx`)
- Displays item count
- Click to toggle cart menu
- Badge with number of items
- Accessible ARIA labels

#### Cart Menu (`components/common/CartMenu.tsx`)
- Dropdown preview of cart
- Shows first 3 items
- Total price display
- "View Cart" and "Checkout" buttons
- Empty cart message

#### Cart Page (`/cart`)
- Full cart display with images
- Quantity controls (+/-)
- Remove item button
- Coupon input per product
- Voucher input (global)
- Price breakdown
- Shipping address selection
- Proceed to checkout button

---

## 🖼 Image Management

### Cloudinary Integration

#### Configuration (`lib/cloudinary.js`)
```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

### Upload System

#### Multer + Cloudinary Storage
```javascript
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../../lib/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shop2_banners',
    format: async (req, file) => 'png',
    public_id: (req, file) => 
      `${file.fieldname}-${Date.now()}`,
  },
});

const upload = multer({ storage: storage });
```

#### Upload API (`/api/upload/image`)
```javascript
apiRoute.post((req, res) => {
  // Check authentication
  const { userId } = auth(req);
  if (!userId) {
    return res.status(401).json({ 
      error: 'Unauthorized' 
    });
  }
  
  if (!req.file) {
    return res.status(400).json({ 
      error: 'No file uploaded' 
    });
  }
  
  // Return Cloudinary URL
  res.status(200).json({ imageUrl: req.file.path });
});
```

### Image Upload Flow

```
Admin selects file → 
Frontend: FormData with file → 
POST /api/upload/image → 
Multer processes file → 
Cloudinary uploads → 
Returns URL → 
Admin saves URL with product/banner/category
```

### Frontend Upload Component Example
```typescript
const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload/image', {
    method: 'POST',
    body: formData,
  });
  
  const data = await response.json();
  return data.imageUrl; // Cloudinary URL
};
```

### Image Display

#### Next.js Image Component
```typescript
import Image from 'next/image';

<Image
  src={cloudinaryUrl}
  alt="Product"
  width={400}
  height={400}
  className="object-cover"
/>
```

#### next.config.ts Image Domains
```typescript
export default {
  images: {
    domains: ['res.cloudinary.com'],
  },
};
```

### Image Optimization

#### Cloudinary Features Used:
- **Automatic Format**: WebP for supported browsers
- **Quality Optimization**: Reduces file size
- **Responsive Images**: Different sizes for different screens
- **CDN Delivery**: Fast worldwide delivery
- **Lazy Loading**: Only loads when needed

#### URL Transformations:
```
Original:
https://res.cloudinary.com/djwcgafdt/image/upload/v123/product.png

Thumbnail:
https://res.cloudinary.com/djwcgafdt/image/upload/w_200,h_200,c_fill/v123/product.png

WebP:
https://res.cloudinary.com/djwcgafdt/image/upload/f_webp/v123/product.png
```

### Image Storage Best Practices

#### Folder Structure:
```
Cloudinary/
└── shop2_banners/
    ├── image-1234567890.png
    ├── image-1234567891.png
    └── ...
```

#### Naming Convention:
- Prefix with field name
- Timestamp for uniqueness
- Example: `image-1642547890123`

#### Database Storage:
- Store full Cloudinary URL
- Don't store local file paths
- URL is permanent and accessible

---

## 🔌 API Endpoints

### Products API

#### `GET /api/products`
**Purpose**: Fetch products with optional filters

**Query Parameters**:
- `searchTerm` - Search in name/description
- `isFeatured` - Filter featured products (true/false)
- `isOnDeal` - Filter deal products (true/false)
- `category` - Filter by category slug
- `debug` - Debug mode (true/false)

**Response**:
```json
[
  {
    "_id": "prod_123",
    "name": "Product Name",
    "slug": "product-name",
    "originalPrice": 99.99,
    "discount": 10,
    "price": 89.99,
    "images": ["https://cloudinary.com/..."],
    "category": { "_id": "cat_1", "name": "Category" },
    "brand": { "_id": "brand_1", "name": "Brand" },
    "stock": 50,
    "isOnDeal": false
  }
]
```

#### `POST /api/products`
**Purpose**: Create new product

**Request Body**:
```json
{
  "name": "New Product",
  "slug": "new-product",
  "description": "Product description",
  "originalPrice": 99.99,
  "discount": 10,
  "price": 89.99,
  "sku": "SKU-123",
  "images": ["url1", "url2"],
  "category": "category_id",
  "brand": "brand_id",
  "stock": 100,
  "coupon": {
    "name": "SAVE10",
    "value": 10
  }
}
```

#### `GET /api/products/[slug]`
**Purpose**: Fetch single product by slug

**Response**: Single product object

#### `PUT /api/products?id=[id]`
**Purpose**: Update product

**Request Body**: Same as POST

#### `DELETE /api/products/[slug]`
**Purpose**: Delete product

### Categories API

#### `GET /api/categories`
**Purpose**: Fetch all categories

**Response**:
```json
[
  {
    "_id": "cat_1",
    "name": "Electronics",
    "slug": "electronics",
    "image": "https://cloudinary.com/...",
    "featured": true,
    "parent": null
  }
]
```

#### `POST /api/categories`
**Purpose**: Create category

#### `GET /api/categories/[slug]`
**Purpose**: Fetch single category

#### `PUT /api/categories/[slug]`
**Purpose**: Update category

#### `DELETE /api/categories/[slug]`
**Purpose**: Delete category

### Brands API

#### `GET /api/brands`
**Purpose**: Fetch all brands

**Response**:
```json
[
  {
    "_id": "brand_1",
    "name": "Nike",
    "slug": "nike",
    "logo": "https://cloudinary.com/...",
    "featured": true,
    "voucher": {
      "name": "NIKE10",
      "value": 10
    }
  }
]
```

#### `POST /api/brands`
**Purpose**: Create brand

#### `GET /api/brands/[slug]`
**Purpose**: Fetch single brand

#### `PUT /api/brands/[slug]`
**Purpose**: Update brand

#### `DELETE /api/brands/[slug]`
**Purpose**: Delete brand

### Banners API

#### `GET /api/banners` or `/api/banners/simple`
**Purpose**: Fetch all banners

**Response**:
```json
[
  {
    "_id": "banner_1",
    "title": "Summer Sale",
    "description": "Up to 50% off",
    "image": "https://cloudinary.com/...",
    "link": "/shop?category=summer",
    "isMiniBanner": false,
    "badge": "50% OFF"
  }
]
```

#### `POST /api/banners`
**Purpose**: Create banner (requires auth)

#### `GET /api/banners/[id]`
**Purpose**: Fetch single banner

#### `PUT /api/banners/[id]`
**Purpose**: Update banner (requires auth)

#### `DELETE /api/banners/[id]`
**Purpose**: Delete banner (requires auth)

### Orders API

#### `GET /api/orders`
**Purpose**: Fetch all orders (admin) or user orders

**Response**:
```json
[
  {
    "_id": "order_1",
    "paymentIntentId": "pi_xxx",
    "userId": "user_123",
    "items": [
      {
        "productId": "prod_1",
        "name": "Product",
        "price": 99.99,
        "quantity": 2
      }
    ],
    "subtotal": 199.98,
    "shippingCost": 10,
    "totalAmount": 209.98,
    "status": "paid",
    "paymentStatus": "succeeded",
    "fulfillmentStatus": "Processing",
    "customerEmail": "user@example.com",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### `POST /api/orders`
**Purpose**: Create order manually (requires auth)

#### `GET /api/orders/[id]`
**Purpose**: Fetch single order

#### `PUT /api/orders/[id]`
**Purpose**: Update order status

**Request Body**:
```json
{
  "status": "processing",
  "paymentStatus": "succeeded"
}
```

### Addresses API

#### `GET /api/addresses`
**Purpose**: Fetch user addresses (requires auth)

**Response**:
```json
[
  {
    "_id": "addr_1",
    "name": "John Doe",
    "streetAddress": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "US",
    "phone": "555-0100",
    "isDefault": true
  }
]
```

#### `POST /api/addresses`
**Purpose**: Create address (requires auth)

#### `PUT /api/addresses/[addressId]`
**Purpose**: Update address (requires auth)

#### `DELETE /api/addresses/[addressId]`
**Purpose**: Delete address (requires auth)

#### `POST /api/addresses/set-default`
**Purpose**: Set default address (requires auth)

### Vouchers API

#### `GET /api/vouchers`
**Purpose**: Fetch all active brand vouchers

**Response**:
```json
{
  "NIKE10": {
    "discount": 10,
    "brandName": "Nike",
    "brandId": "brand_1"
  },
  "ADIDAS15": {
    "discount": 15,
    "brandName": "Adidas",
    "brandId": "brand_2"
  }
}
```

### Web Data API

#### `GET /api/webdata`
**Purpose**: Fetch website data

**Response**:
```json
{
  "_id": "webdata_1",
  "aboutUs": "Company information...",
  "terms": "Terms and conditions...",
  "privacy": "Privacy policy...",
  "faqs": "FAQ content...",
  "help": "Help information...",
  "socialLinks": {
    "facebook": "https://facebook.com/...",
    "twitter": "https://twitter.com/...",
    "instagram": "https://instagram.com/..."
  },
  "contactInfo": {
    "visitUs": "123 Main St, City",
    "callUs": "+1-555-0100",
    "emailUs": "contact@shop.com",
    "workingHours": "Mon-Fri 9AM-6PM"
  },
  "logo": "https://cloudinary.com/...",
  "storeName": "My Shop",
  "sectionSettings": {
    "shopByBrandsVisible": true
  }
}
```

#### `POST /api/webdata`
**Purpose**: Update website data

### Upload API

#### `POST /api/upload/image`
**Purpose**: Upload image to Cloudinary (requires auth)

**Request**: multipart/form-data with `image` field

**Response**:
```json
{
  "imageUrl": "https://res.cloudinary.com/..."
}
```

### Stripe APIs

#### `POST /api/stripe/create-payment-intent`
**Purpose**: Create payment intent for checkout

**Request Body**:
```json
{
  "items": [...],
  "shipping": { "cost": 10 },
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

#### `POST /api/stripe/webhook`
**Purpose**: Handle Stripe webhooks

**Headers**: `stripe-signature` required

**Events**: payment_intent.succeeded, payment_intent.payment_failed

### User APIs

#### `GET /api/user/profile`
**Purpose**: Fetch user profile (requires auth)

#### `PUT /api/user/profile`
**Purpose**: Update user profile (requires auth)

### API Response Patterns

#### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

#### Pagination (not yet implemented)
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

---

## 🧩 Frontend Components

### Layout Components

#### Root Layout (`app/layout.tsx`)
- Wraps entire app
- Clerk Provider
- Client Providers (WebData, Toast)
- Global CSS
- Font configuration

#### Client Layout (`app/(client)/layout.tsx`)
- Header
- Footer
- Main content area
- Navigation

#### Admin Layout (`app/admin/layout.tsx`)
- Admin sidebar navigation
- Admin header
- Content area

### Header Components

#### Header (`components/header/Header.tsx`)
- Logo
- Search bar
- Navigation links
- Cart icon
- Account icon
- Deals link
- Mobile menu toggle

#### Mobile Menu (`components/header/MobileMenu.tsx`)
- Responsive sidebar
- Category links
- Account links
- Close button

#### Search Bar (`components/header/Searchbar.tsx`)
- Search input
- Real-time suggestions
- Search button
- Clear button

#### Cart Icon (`components/header/Carticon.tsx`)
- Item count badge
- Opens cart menu
- Accessible

#### Cart Menu (`components/common/CartMenu.tsx`)
- Dropdown cart preview
- First 3 items
- Total price
- View cart/Checkout buttons

### Product Components

#### Product Grid (`components/common/ProductGrid.tsx`)
- Displays products in grid
- Responsive columns
- Loading states
- Empty state

#### Product Card (`components/common/ProductCard.tsx`)
- Product image
- Name, price
- Discount badges
- Deal badges
- Add to cart button
- Quick view option
- Hover effects

#### Product Details (`components/pages/singleProduct/ProductDetails.tsx`)
- Complete product info
- Price calculation display
- Quantity selector
- Add to cart
- Share button
- Specifications table
- Coupon display

#### Image View (`components/pages/singleProduct/ImageView.tsx`)
- Image gallery
- Main image display
- Thumbnail navigation
- Zoom functionality

#### Add to Cart (`components/common/AddToCart.tsx`)
- Add to cart button
- Quantity controls
- Stock validation
- Toast notifications

### Cart Components

#### Cart Client Page (`components/pages/cart/CartClientPage.tsx`)
- Full cart display
- Item list with images
- Quantity controls
- Coupon/voucher inputs
- Price breakdown
- Address selection
- Checkout button

### Checkout Components

#### Checkout Form (`components/checkout/CheckoutForm.tsx`)
- Stripe Elements integration
- Payment Element
- Address Element
- Email input
- Order summary
- Submit button
- Loading states
- Error handling

### Admin Components

#### Product Management

**ProductList** (`components/admin/products/ProductList.tsx`)
- Table of products
- Edit/Delete buttons
- Search/Filter
- Image thumbnails

**ProductForm** (`components/admin/products/ProductForm.tsx`)
- All product fields
- Image upload
- Category/Brand dropdowns
- Coupon inputs
- Deal settings
- Submit handler

#### Category Management

**CategoryList** (`components/admin/categories/CategoryList.tsx`)
- Category table
- Edit/Delete actions

**CategoryForm** (`components/admin/categories/CategoryForm.tsx`)
- Category fields
- Image upload
- Parent category select

#### Brand Management

**BrandList** (`components/admin/brands/BrandList.tsx`)
- Brand table
- Actions

**BrandForm** (`components/admin/brands/BrandForm.tsx`)
- Brand fields
- Logo upload
- Voucher settings

#### Banner Management

**BannerList** (`components/admin/banners/BannerList.tsx`)
- Banner grid/list
- Edit/Delete

**BannerForm** (`components/admin/banners/BannerForm.tsx`)
- Banner fields
- Image upload
- Banner type toggle

#### Web Data Management

**WebDataForm** (`components/admin/webdata/WebDataForm.tsx`)
- All web data fields
- Text areas for content
- Social links inputs
- Contact info inputs
- Logo upload
- Section toggles

### Common Components

#### Container (`components/common/Container.tsx`)
- Max-width wrapper
- Responsive padding
- Consistent spacing

#### Footer (`components/common/Footer.tsx`)
- Company info
- Links (About, Terms, Privacy)
- Social media icons
- Newsletter signup
- Contact information

#### Footer Top (`components/common/FooterTop.tsx`)
- Quick links
- Categories
- Popular products

#### Logo (`components/common/Logo.tsx`)
- Site logo display
- Fetches from WebData
- Link to homepage

#### Breadcrumb (`components/common/Breadcrumb.tsx`)
- Navigation breadcrumb
- Current page indicator

#### Dynamic Breadcrumb (`components/common/DynamicBreadcrumb.tsx`)
- Auto-generates breadcrumb
- Based on route

### UI Components (shadcn/ui)

Located in `components/ui/`:
- `button.tsx` - Button variants
- `card.tsx` - Card container
- `input.tsx` - Input field
- `label.tsx` - Form label
- `select.tsx` - Dropdown select
- `separator.tsx` - Divider line
- `badge.tsx` - Pill badge
- `accordion.tsx` - Collapsible sections
- `checkbox.tsx` - Checkbox input
- `slider.tsx` - Range slider
- `tabs.tsx` - Tab navigation
- `tooltip.tsx` - Hover tooltip
- `alert-modal.tsx` - Custom alert modal

### Page Components

#### Home Page Components

**Banner** (`components/pages/home/Banner.tsx`)
- Carousel of main banners
- Auto-play
- Navigation dots

**HomeCategories** (`components/pages/home/HomeCategories.tsx`)
- Featured categories grid
- Images and names
- Links to filtered shop

**ShopbyBrands** (`components/pages/home/ShopbyBrands.tsx`)
- Brand logos carousel
- Clickable brand links

**MiniBanner** (`components/pages/home/MiniBanner.tsx`)
- Small promotional banners
- Grid layout

#### Account Components

**AccountMenu** (`components/pages/account/AccountMenu.tsx`)
- Sidebar navigation
- Account sections

**ClientAccountLayout** (`components/pages/account/ClientAccountLayout.tsx`)
- Account page wrapper
- Menu and content

### Providers

**ClientProviders** (`components/providers/ClientProviders.tsx`)
- Wraps client components
- Provides web data context
- Toast notifications

---

## 📊 State Management

### Zustand Store (Cart)

**Location**: `store.ts`

**Purpose**: Global cart state with localStorage persistence

**Features**:
- Items array
- Applied voucher
- Cart operations
- Price calculations
- Coupon management
- Persistence across sessions

### React Context (Web Data)

**Location**: `components/providers/ClientProviders.tsx`

**Purpose**: Global website data (logo, store name, etc.)

**Usage**:
```typescript
const { webData } = useWebData();
```

### Local Component State

**useState**: For component-specific state
- Form inputs
- Toggle states
- Loading states
- Modals

**useEffect**: For side effects
- Data fetching
- Subscriptions
- Event listeners

### Server State

**Next.js Server Components**: Fetch data on server
- No client-side loading
- SEO-friendly
- Automatic caching

**API Route Handlers**: Serve data to client
- RESTful endpoints
- Database queries

---

## ⚠️ Important Implementation Details

### 1. **Sanity to MongoDB Migration**
- **Previous**: Used Sanity CMS
- **Current**: MongoDB with Mongoose
- **Why**: More control, flexibility, no external dependencies
- **Changes**:
  - Removed all `@sanity/*` packages
  - Created Mongoose models
  - Migrated data structure
  - Updated API endpoints
  - Changed image storage to Cloudinary

### 2. **Dual API Routing**
- **App Router**: `/app/api` for new endpoints
- **Pages Router**: `/pages/api` for legacy endpoints
- **Reason**: Gradual migration, compatibility
- **Note**: Prefer App Router for new features

### 3. **Authentication Patterns**
```typescript
// Pages Router (old)
import { auth } from '@clerk/nextjs/server';
const { userId } = auth(req);

// App Router (new)
import { auth } from '@clerk/nextjs/server';
const { userId } = auth();
```

### 4. **Database Connection**
- Singleton pattern prevents multiple connections
- Connection cached in `connection.isConnected`
- Auto-reconnect on failure
- Always call `await dbConnect()` before DB operations

### 5. **Image URL Handling**
- Images stored as full Cloudinary URLs
- No local file paths
- `image` and `imageUrl` fields (legacy compatibility)
- Always check for null/undefined images

### 6. **Price Calculation Order**
```
1. Original Price: $100
2. Product Discount (20%): $100 → $80
3. Deal Discount (10%): $80 → $72 (compound)
   OR Coupon (15%): $80 → $68 (compound)
4. Voucher (10%): Applied to subtotal
```

### 7. **Deal Products Restrictions**
- ❌ Cannot use product coupons
- ❌ Cannot use brand vouchers
- ✅ Get regular discount + deal discount
- **Reason**: Already best price, prevents double-dipping

### 8. **User Profile Creation**
- Created automatically on first order
- Can exist without Clerk (email-only)
- `clerkId` is optional (`sparse: true` index)
- Synced via Clerk webhook or payment webhook

### 9. **Address Management**
- Separate `Address` collection (new)
- Embedded `addresses` in UserProfile (legacy)
- Use separate collection for new addresses
- `isDefault` flag for default address

### 10. **Order Status Enum**
```typescript
status: 'pending' | 'processing' | 'on_way' | 
        'about_to_deliver' | 'shipped' | 
        'delivered' | 'cancelled'
```

### 11. **Webhook Security**
- **Stripe**: Signature verification required
- **Clerk**: Svix signature verification
- **Localhost**: Signature verification skipped in development
- **Production**: Always verify signatures

### 12. **Stock Management**
- Stock reduced in webhook handler
- Atomic operation (`$inc`)
- No overselling protection yet (future enhancement)
- Stock displayed on product page

### 13. **Cart Persistence**
- Stored in localStorage
- Survives page refresh
- Syncs across tabs
- Key: `cart-storage`
- No server-side cart (yet)

### 14. **Error Handling Patterns**
```typescript
try {
  // Operation
  return success response
} catch (error) {
  console.error('Error:', error);
  return error response with status code
}
```

### 15. **Middleware Configuration**
- Public routes defined in `middleware.ts`
- Clerk checks authentication automatically
- API routes require manual auth check
- Admin routes should add role check (future)

### 16. **Environment Variables**
- Never commit `.env.local`
- Use `.env.example` as template
- Server-side only: `STRIPE_SECRET_KEY`, `MONGODB_URI`, etc.
- Client-side (public): Prefix with `NEXT_PUBLIC_`

### 17. **TypeScript Types**
- Located in `types/index.ts`
- Models in `models/*.js` (JavaScript for Mongoose)
- Frontend uses TypeScript types
- Type mismatches possible between DB and types

### 18. **Responsive Design**
- Mobile-first approach
- Tailwind breakpoints: sm, md, lg, xl, 2xl
- Mobile menu for small screens
- Responsive images

### 19. **SEO Considerations**
- Server-side rendering for product pages
- Meta tags in layouts
- Semantic HTML
- Image alt tags
- Breadcrumbs for navigation

### 20. **Performance Optimizations**
- Next.js Image component for optimization
- Cloudinary CDN for images
- Server components by default
- Lazy loading images
- Code splitting automatic

---

## 🔧 Environment Configuration

### Required Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shop2

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/account/account
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/account/account

# Stripe Payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Deprecated (not needed anymore)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_TOKEN=xxx
```

### How to Get Keys

#### MongoDB Atlas:
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a cluster (free tier available)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for all IPs)
5. Get connection string from "Connect" button

#### Clerk:
1. Sign up at https://clerk.com
2. Create application
3. Get keys from Dashboard → API Keys
4. Configure redirect URLs in Clerk dashboard

#### Stripe:
1. Sign up at https://stripe.com
2. Get test keys from Dashboard → Developers → API Keys
3. Set up webhook endpoint
4. Get webhook secret from Webhooks section

#### Cloudinary:
1. Sign up at https://cloudinary.com
2. Get credentials from Dashboard
3. Note your cloud name, API key, and secret

---

## 🚀 Deployment & Setup

### Local Development Setup

#### 1. **Clone Repository**
```bash
git clone <repository-url>
cd shop2
```

#### 2. **Install Dependencies**
```bash
npm install
```

#### 3. **Configure Environment**
```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your keys
```

#### 4. **Start MongoDB** (if local)
```bash
mongod
```

Or use MongoDB Atlas (recommended)

#### 5. **Run Development Server**
```bash
npm run dev
```

Visit http://localhost:3000

#### 6. **Test Stripe Webhooks** (optional)
```bash
# Install Stripe CLI
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Use signing secret in .env.local
```

### Build & Production

#### Build for Production
```bash
npm run build
```

#### Start Production Server
```bash
npm start
```

### Deployment Platforms

#### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push
4. Set up Stripe webhook with production URL

#### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Set environment variables

#### AWS/DigitalOcean
1. Set up Node.js environment
2. Clone repository
3. Install dependencies
4. Build project
5. Run with PM2 or similar

### Post-Deployment Checklist

- [ ] Environment variables set
- [ ] MongoDB connection working
- [ ] Clerk authentication working
- [ ] Stripe webhook configured
- [ ] Cloudinary images loading
- [ ] Admin panel accessible
- [ ] Test order placement
- [ ] Test payment processing
- [ ] Verify webhook delivery
- [ ] Check error logs

---

## 🐛 Bug Fixes & Improvements

### Major Bugs Fixed

#### 1. **User Not Found Error**
**Problem**: Users logged in but API returned "User not found"

**Root Cause**: Inconsistent user lookup logic between clerkId and email

**Solution**:
- Updated all address routes to use `auth()` for current user
- Added fallback to find user by email
- Auto-update clerkId if found by email

**Files Changed**:
- `app/api/addresses/route.ts`
- `app/api/addresses/set-default/route.ts`

#### 2. **Address Upload Failure**
**Problem**: Users unable to save addresses

**Root Cause**:
- Strict unique constraints on UserProfile
- Duplicate users in database
- Schema validation issues

**Solution**:
- Added `sparse: true` to unique constraints (allows nulls)
- Created cleanup script for duplicate users
- Enhanced error logging

**Files Changed**:
- `models/UserProfile.js`
- `scripts/cleanup-users.js`

#### 3. **Admin Banner Upload Fail**
**Problem**: Admin couldn't upload banners

**Root Cause**:
- Missing authentication on banner APIs
- Upload API missing auth check
- Middleware not configured for admin routes

**Solution**:
- Added auth to all banner routes
- Protected image upload endpoint
- Updated middleware public routes

**Files Changed**:
- `pages/api/banners/index.js`
- `pages/api/banners/[id].js`
- `pages/api/upload/image.js`
- `middleware.ts`

#### 4. **Payment Webhook Failures**
**Problem**: Orders not created after successful payment

**Root Cause**:
- Webhook signature verification failing
- Metadata parsing errors
- User profile creation errors

**Solution**:
- Added localhost development mode
- Improved error handling
- Better metadata parsing
- Fallback order creation endpoint

**Files Changed**:
- `app/api/stripe/webhook/route.ts`
- `pages/api/orders/process-payment.js`

### Known Issues & Limitations

#### 1. **Admin Role Management**
**Issue**: No explicit admin role checking

**Current**: Admin access through route protection only

**Recommended**: Implement role-based access control (RBAC)

**How to Fix**:
```typescript
// Add to UserProfile model
role: { 
  type: String, 
  enum: ['user', 'admin'], 
  default: 'user' 
}

// Check in admin routes
const user = await UserProfile.findOne({ clerkId: userId });
if (user.role !== 'admin') {
  return res.status(403).json({ error: 'Forbidden' });
}
```

#### 2. **Stock Overselling**
**Issue**: No prevention of overselling when stock is low

**Current**: Stock reduced after payment, no reservation

**Recommended**: Implement stock reservation system

**How to Fix**:
- Reserve stock when cart is created
- Release after timeout or checkout
- Lock during payment processing

#### 3. **No Order Cancellation**
**Issue**: Users can't cancel orders

**Current**: Admin can change status to cancelled

**Recommended**: Add user-facing cancel order feature

#### 4. **Single Shipping Rate**
**Issue**: Fixed $10 shipping cost

**Current**: Hardcoded in checkout

**Recommended**: Dynamic shipping calculation

**How to Fix**:
- Add shipping zones to WebData
- Calculate based on address
- Multiple shipping options

#### 5. **No Inventory Alerts**
**Issue**: No low stock notifications

**Recommended**: Email admin when stock < threshold

#### 6. **Limited Search**
**Issue**: Basic text search only

**Recommended**: Full-text search, filters, facets

**How to Fix**: Implement MongoDB text indexes or Algolia

#### 7. **No Product Reviews**
**Issue**: No customer reviews/ratings

**Recommended**: Add review system

**Schema**:
```javascript
{
  product: ObjectId,
  user: ObjectId,
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

#### 8. **No Email Notifications**
**Issue**: No order confirmation emails

**Recommended**: Email service integration (SendGrid, Mailgun)

#### 9. **No Analytics**
**Issue**: No admin dashboard analytics

**Recommended**: Add charts for sales, orders, popular products

#### 10. **Mobile App**
**Issue**: No native mobile app

**Recommended**: React Native or responsive PWA

### Future Enhancements

#### High Priority
1. Admin role management with RBAC
2. Email notifications (order confirmation, shipping)
3. Product reviews and ratings
4. Advanced search and filters
5. Inventory low-stock alerts

#### Medium Priority
6. Wishlist/Favorites functionality
7. Product comparison feature
8. Order tracking with shipping carrier
9. Multi-currency support
10. Gift cards and store credit

#### Low Priority
11. Customer support chat
12. Loyalty/rewards program
13. Subscription products
14. Pre-orders
15. Multi-language support

---

## 📚 Learning Outcomes (For Presentation)

### Technical Skills Demonstrated

#### Full-Stack Development
- Frontend with React/Next.js
- Backend with Node.js/Next.js API routes
- Database design with MongoDB
- RESTful API design

#### Authentication & Security
- OAuth implementation (Clerk)
- JWT token handling
- Webhook signature verification
- Environment variable management
- Secure payment processing

#### Payment Integration
- Stripe payment flow
- Webhook handling
- Payment intent creation
- Transaction management

#### State Management
- Global state with Zustand
- Local component state
- Server-side state
- State persistence

#### Cloud Services
- MongoDB Atlas (database)
- Cloudinary (image storage)
- Clerk (authentication)
- Stripe (payments)
- Vercel (deployment)

#### Modern Web Development
- Server-side rendering
- Static site generation
- API routes
- TypeScript
- Tailwind CSS

### Project Management Skills
- Git version control
- Environment configuration
- Debugging complex issues
- Documentation
- Deployment processes

### Business Logic Implementation
- E-commerce workflows
- Discount systems
- Inventory management
- Order fulfillment
- User experience design

---

## 📖 Conclusion

This e-commerce platform demonstrates a complete, production-ready full-stack application with:

✅ **Complete Admin Panel** for store management
✅ **Secure Payment Processing** with Stripe
✅ **Modern Authentication** with Clerk
✅ **Complex Discount System** with multiple discount types
✅ **Cloud Storage** with Cloudinary
✅ **Responsive Design** for all devices
✅ **RESTful API** architecture
✅ **MongoDB Database** with proper schemas
✅ **Real-time Updates** via webhooks
✅ **Production-Ready** deployment setup

This project showcases enterprise-level e-commerce functionality suitable for a final year project demonstration, with comprehensive features from admin management to user checkout experience.

---

## 📞 Support & Maintenance

### Development Team Responsibilities
- Monitor error logs
- Update dependencies regularly
- Backup database
- Test payment processing
- Review security updates

### User Support
- Order issues → Check admin panel
- Payment issues → Verify Stripe dashboard
- Account issues → Check Clerk dashboard
- Image issues → Verify Cloudinary uploads

### Monitoring
- Stripe dashboard for payments
- MongoDB Atlas for database
- Vercel/hosting logs for errors
- Clerk dashboard for users

---

**End of Documentation**

*Last Updated: January 2025*
*Project: E-Commerce Shop (Final Year Project)*
*Tech Stack: Next.js 15, MongoDB, Stripe, Clerk, Cloudinary*
