// App configuration

const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  appName: "Smart Apparel Solutions",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  currency: "USD",
  locale: "en-US",
  features: {
    blog: true,
    wishlist: true,
    reviews: true,
    liveChat: false,
  },
};

export default config;
