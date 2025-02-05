# Smart Shop - AI-Powered E-Commerce PWA

Smart Shop is a cutting-edge **AI-powered e-commerce** platform that provides a seamless shopping experience. Designed as a **Progressive Web App (PWA)**, it ensures fast, responsive, and engaging interactions across all devices. With advanced AI-driven recommendations, role-based functionalities, and real-time updates, Smart Shop is the future of online shopping.

## 🌟 Features

### 🛍️ Public Pages

- **Landing Page (/)** – Eye-catching homepage introducing Smart Shop.
- **About Page (/about)** – Information about Smart Shop’s vision.
- **Services Page (/services)** – Overview of available services.
- **Contact Page (/contact)** – Allows users to get in touch.

### 🔑 Authentication & User Roles

- Users can **sign up** and **log in**, then are redirected to **/home**.
- Upon registration, users are assigned the **USER** role.

### 👥 User Functionalities

- **Explore Products (/explore)** – Browse, filter (category, price, tags, ratings), sort, and paginate products (30 per page).
- **Cart (/cart)** – Manage cart and checkout. Sellers get notified upon checkout.
- **Orders (/orders)** – Track and monitor order statuses.
- **Profile (/profile)** – Customize account settings.
- **Support (/support)** – Access customer support.
- **Product Details (/product/:id)** – View product details, ratings, reviews, and add reviews.
- **Seller Profile (/seller/:id)** – View seller details and their products.

### 🛠️ Header Features

- **🔔 Notification Button** – View order status updates.
- **🤖 AI Bot Button** – AI tracks user activity and recommends products.
- **🎨 Theme Changer** – Toggle between themes.
- **🛒 Become a Seller Button** – Redirects to seller application page.

### 🏪 Seller Functionalities

- **Dashboard (/dashboard)** – View total products, total orders, revenue stats, and analytics.
- **Orders (/orders)** – Update order statuses (**PENDING → SHIPPED → DELIVERED**) and notify users.
- **Profile (/profile)** – Manage seller account settings.
- **Products (/products)**:
  - **Add New Product** – Upload product details and images. AI assists with title & description enhancement.
  - **Edit Product** – Modify product details, update images.
  - **Delete Product** – Remove unwanted products.

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
- **OpenAI & Google Generative AI** – AI-powered recommendations and content generation.

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
git clone https://github.com/your-repo/smart-shop.git
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

Made with ❤️ by Nurio34 🚀
