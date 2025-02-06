# Smart Shop - AI-Powered E-Commerce PWA

Smart Shop is a cutting-edge **AI-powered e-commerce** platform that provides a seamless shopping experience. Designed as a **Progressive Web App (PWA)**, it ensures fast, responsive, and engaging interactions across all devices. With advanced AI-driven recommendations, role-based functionalities, and real-time updates, Smart Shop is the future of online shopping.

## 🌟 Features

### 🛍️ Public Pages

- **Landing Page (/)** – The main page of Smart Shop, showcasing the platform’s features and benefits.
- **About Page (/about)** – Provides insights into the vision, mission, and objectives of Smart Shop.
- **Services Page (/services)** – Outlines the key services and functionalities available.
- **Contact Page (/contact)** – Users can fill out a form to get in touch with support or inquiries.

### 🔑 Authentication & User Roles

- **User Authentication** – Users can sign up and log in using a secure authentication system.
- **Redirection to Home** – After logging in, users are taken to the **/home** page, which displays the first five products from every category.
- **Default User Role** – Upon signing up, the default role assigned is **USER**.

### 👥 User Functionalities

- **Explore Products (/explore)** – Users can browse and filter products based on:
  - **Category** – Filter products based on predefined categories.
  - **Minimum and Maximum Price** – Define a price range for products.
  - **Tags and Ratings** – Sort by product tags or user ratings.
  - **Sorting Options** – Sort results by price, popularity, or newest items.
  - **Pagination** – Displays 30 products per page with navigation buttons for more.
- **Cart (/cart)** – Users can:
  - **Add and remove items** from their cart.
  - **Proceed to checkout** to finalize their purchase.
  - **Trigger a notification** to the seller upon a successful checkout.
- **Orders (/orders)** – Users can:
  - **Track all placed orders** and their status updates.
  - **View details** of each order including delivery status.
- **Profile (/profile)** – Users can update personal information, such as:
  - Name, email, and password.
  - Manage notification preferences.
  - Update shipping details.
- **Support (/support)** – Users can:
  - **Submit a support ticket** for assistance.
  - **Browse FAQs** for common issues.
- **Product Details (/product/:id)** – On this page, users can:
  - **View product descriptions, images, and details.**
  - **See product ratings and reviews.**
  - **Rate the product and leave a review.**
- **Seller Profile (/seller/:id)** – Users can:
  - **View details about the seller.**
  - **See all products listed by the seller.**

### 🛠️ Header Features

- **🔔 Notification Button** – Users receive real-time notifications for:
  - Order status changes (Pending → Shipped → Delivered).
  - Important system messages or promotions.
- **🤖 AI Bot Button** – The AI-powered assistant:
  - Tracks user behavior (visited, viewed, and purchased products).
  - Provides personalized recommendations based on past activity.
- **🎨 Theme Changer** – Users can switch between light and dark mode for an optimized experience.
- **🛒 Become a Seller Button** – When clicked, it redirects to the **/become-seller** page, where users can:
  - **Fill out a form** with personal and business details.
  - **Submit the application** to become a seller.
  - **Restricted Access** – Once approved, users can no longer access buyer-only pages.

### 🏪 Seller Functionalities

- **Home Page (/home)** – Shows the first five products from every category.
- **Dashboard (/dashboard)** – Provides an overview of seller activities:
  - **Total Products** – Number of active products.
  - **Total Orders Received** – The number of successful sales.
  - **Total Revenue** – Earnings summary.
  - **Monthly Revenue Graph** – Visual representation of earnings trends.
  - **List of Products** – Quick access to seller’s inventory.
- **Orders (/orders)** – Sellers can:
  - **Update order statuses** from **PENDING → SHIPPED → DELIVERED**.
  - **Trigger a notification** to the buyer whenever status changes.
- **Profile (/profile)** – Sellers can manage their business settings, including:
  - Personal and store information.
  - Preferred notification settings.
- **Products (/products)**:
  - **Add New Product** –
    - Fill out a product form with title, description, category, and pricing.
    - Upload a **thumbnail** and multiple **product images**.
    - Use **next-cloudinary** to edit images after upload.
    - AI Assistant provides **title and description suggestions** based on analysis.
  - **Edit Product** –
    - Modify any product details.
    - Change **thumbnail** or **add/remove images**.
  - **Delete Product** – Remove a product from the inventory.

## ⚡ Tech Stack

### 🌐 Frontend

- **Next.js 15** – Fast and efficient React framework.
- **React 19 & React DOM 19** – UI rendering.
- **Tailwind CSS & DaisyUI** – Beautiful, responsive UI design.
- **Framer Motion** – Smooth animations.
- **React Hook Form & Zod** – Form handling and validation.
- **React Redux & Toolkit** – State management.
- **React ApexCharts** – Data visualization.

### ⚙️ Backend & Database

- **Next.js API Routes** – Backend logic.
- **Prisma && PostgreSQL with NeonDB** – Database management.
- **Cloudinary** – Image storage and optimization.
- **Nodemailer** – Email services.
- **Google Generative AI** – AI-powered recommendations and content generation.

### 🔐 Authentication & Security

- **Clerk.js** – User authentication.
- **Dompurify** – Prevents XSS attacks.

## 📌 Key Highlights

✅ **AI-powered product recommendations**
✅ **Role-based access (User & Seller)**
✅ **Real-time order notifications**
✅ **Seamless image management & AI-powered content enhancement**
✅ **PWA – Works offline & provides a native-like experience**

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/nurio34/smart-shop.git
cd smart-shop

# Install dependencies
npm install
```

### Running the App

```bash
# Start development server
npm run dev
```

### Build & Deploy

```bash
npm run build
npm run start
```

## 🎯 Live Demo

🔗 [Smart Shop Live](https://smartshop-ashen.vercel.app)

---

Made with ❤️ by the Nurio34 🚀
