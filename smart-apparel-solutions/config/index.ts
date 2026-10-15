// App configuration

const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  appName: "Smart Apparel Solutions",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  currency: "LKR",
  locale: "en-LK",
  phone: "+94 71 206 1850",
  whatsappUrl: "https://wa.me/94712061850",
  tagline: "හැඩට වැඩට ස්මාට් විසඳුමක්",
  email: "sales@smartapparelsolutions.lk",
  address: "No. 125, Galle Road, Colombo 03, Sri Lanka",
  announcement:
    "🚚 Island-wide delivery · 3× installments with Koko · Call 071 206 1850",
  features: {
    blog: true,
    wishlist: true,
    reviews: true,
    liveChat: false,
  },
};

export default config;
