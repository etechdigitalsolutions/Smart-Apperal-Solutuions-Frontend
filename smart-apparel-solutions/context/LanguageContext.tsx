"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "si" | "ta";

const translations = {
  en: {
    home: "Home", categories: "Categories", search: "Search", cart: "Cart", account: "Account",
    wishlist: "Wishlist", explore: "Explore equipment", close: "Close", menu: "Menu",
  },
  si: {
    home: "මුල් පිටුව", categories: "කාණ්ඩ", search: "සොයන්න", cart: "බඳුන", account: "ගිණුම",
    wishlist: "පෙලගැස්ම", explore: "උපකරණ බලන්න", close: "වසන්න", menu: "මෙනුව",
  },
  ta: {
    home: "முகப்பு", categories: "வகைகள்", search: "தேடு", cart: "வண்டி", account: "கணக்கு",
    wishlist: "விருப்பப்பட்டியல்", explore: "உபகரணங்கள்", close: "மூடு", menu: "மெனு",
  },
} as const;

const interfaceTranslations: Record<Language, Record<string, string>> = {
  en: {},
  si: {
    "The workshop partner": "වැඩමුළු සහකරු",
    "Make more.": "තවත් කරගන්න.",
    "Make it better.": "වඩා හොඳින් සාදන්න.",
    "Explore equipment": "උපකරණ බලන්න",
    "Talk to a specialist": "විශේෂඥයෙකුගෙන් සහාය ලබාගන්න",
    "Find your fit": "ඔබට ගැළපෙන එක තෝරන්න",
    "What are you making?": "ඔබ සකස් කරන්නේ කුමක්ද?",
    "Start with the work you do. We'll help you find equipment that earns its place on the floor.":
      "ඔබ කරන වැඩෙන් ආරම්භ කරන්න. නිෂ්පාදන පිරිසට යෝග්‍ය උපකරණ සොයාගැනීමට අපි සහය දෙන්නෙමු.",
    "The right tools, together": "නිවැරදි මෙවලම් එකට",
    "Build your line": "ඔබේ නිෂ්පාදන මාර්ගය සකසන්න",
    "More than a machine": "කන්ඩායමට වඩා",
    "Keep production moving.": "නිෂ්පාදනය අඛණ්ඩව සිදු කරන්න.",
    "Service & repair": "සේවා සහ අලුත්වැඩියා",
    "Get a quotation": "මිල ගණන් ඉල්ලීම",
    "Brands we stand behind": "අපගේ විශ්වාසනීය සන්නම්",
    "Made to work hard": "දැඩි වැඩ සඳහා",
    "Lowest Price Guaranteed": "අඩුම මිල Guaranteed",
    "Special discounts available": "විශේෂ වට්ටම් තිබේ",
    "Production process": "නිෂ්පාදන ක්‍රියාවලිය",
    "What Are We Making?": "අපි සාදන්නේ කුමක්ද?",
    "Cutting and Preparation": "කපීම සහ සූදානම",
    "Embroidery and Detail": "එම්බ්‍රොයිඩරි සහ විස්තර",
    "Sewing and Construction": "මැහුම් සහ නිර්මාණය",
    "Finishing and Pressing": "අවසන් කිරීම සහ ඉස්තියම්",

    "Equipment": "උපකරණ",
    "Parts & Supplies": "අමතර කොටස් සහ සැපයුම්",
    "Services & Support": "සේවා සහ සහාය",
    "Sewing Machines": "මැහුම් යන්ත්‍ර",
    "Cutting": "කපන්නා",
    "Ironing & Finishing": "ස්ට්‍රීම් සහ අවසාන කිරීම",
    "Embroidery": "එම්බ්‍රොයිඩරි",
    "Home Appliances": "ගෘහ උපකරණ",
    "Spare Parts": "අමතර කොටස්",
    "Needles": "බහුල සහිත ඉඳිකටු",
    "Accessories": "උපකරණ",
    "Brands": "සන්නම්",
    "Services & Repair": "සේවා සහ අලුත්වැඩියා",
    "Installments": "කিস্তි",
    "Track Order": "ඇණවුම සොයන්න",
    "Apply for Credit Account": "ණය ගිණුමක් ඉල්ලන්න",
    "News / Blog": "පුවත් / බ්ලොග්",
    "Contact": "අප අමතන්න",
    "Search machines, parts and brands": "යන්ත්‍ර, කොටස් සහ සන්නම් සොයන්න",
    "No products found. Try a brand or model number.": "නිෂ්පාදන හමු නොවීය. සන්නමක් හෝ මාදිලිය අංකයක් උත්සාහ කරන්න.",
    "View all results": "සියලු ප්‍රතිපල බලන්න",
    "Wishlist": "පෙලගැස්ම",
    "Cart": "බහලුම",
    "Account": "ගිණුම",
    "Close menu": "මෙනුව වසන්න",
    "Open menu": "මෙනුව විවෘත කරන්න",

    "Product Index": "නිෂ්පාදන දර්ශකය",
    "Customer Support": "පාරිභෝගික සහාය",
    "About Us": "අප ගැන",
    "Contact Us": "අප අමතන්න",
    "Visit Our Showroom": "අපගේ ප්‍රදර්ශනාගාරයට පැමිණෙන්න",
    "Stay in the loop": "නවතම තොරතුරු ලබාගන්න",
    "Subscribe to receive product updates and latest news.": "නිෂ්පාදන යාවත්කාලීන සහ නවතම පුවත් ලබාගැනීමට දායක වන්න.",
    "Enter your email address": "ඔබගේ විද්‍යුත් තැපැල් ලිපිනය ඇතුළත් කරන්න",
    "Subscribe": "දායක වන්න",
    "Mon–Sat: 9:00 AM – 7:00 PM": "සඳුදා–සෙනසුරාදා: පෙ.ව. 9:00 – ප.ව. 7:00",

    "Contact information": "සම්බන්ධතා තොරතුරු",
    "Log in": "පිවිසෙන්න",
    "Email address": "විද්‍යුත් තැපැල් ලිපිනය",
    "You are currently checking out as a guest.": "ඔබ දැන් අමුත්තෙකු ලෙස පරීක්ෂා කරමින් සිටී.",
    "Create an account": "ගිණුමක් සාදන්න",
    "Track orders, view inquiries and manage your personal details.": "ඇණවුම් සොයන්න, විමසුම් බලන්න සහ පෞද්ගලික තොරතුරු කළමනාකරණය කරන්න.",
    "Password": "මුරපදය",
    "Confirm password": "මුරපදය තහවුරු කරන්න",
    "Passwords do not match.": "මුරපද නොගැලපේ.",
    "Delivery": "බෙදාහැරීම",
    "Ship": "නැව්ගත කිරීම",
    "Store Pickup": "ගබඩාවෙන් ලබාගන්න",
    "Pickup locations": "ලබාගන්න ස්ථාන",
    "FREE": "නොමිලේ",
    "Billing address": "බිල්පත් ලිපිනය",
    "Shipping address": "බෙදාහැරීමේ ලිපිනය",
    "Use same address for billing": "බිල්පත් සඳහා එකම ලිපිනය භාවිතා කරන්න",
    "Shipping options": "බෙදාහැරීම් විකල්ප",
    "Standard delivery": "සම්මත බෙදාහැරීම",
    "Confirmed after order": "ඇණවුමෙන් පසු තහවුරු කෙරේ",
    "Enter a shipping address to view shipping options.": "බෙදාහැරීම් විකල්ප බැලීමට ලිපිනය ඇතුළත් කරන්න.",
    "Payment options": "ගෙවීම් විකල්ප",
    "Add a note to your order": "ඔබේ ඇණවුමට සටහනක් එක් කරන්න",
    "Promo code": "වට්ටම් කේතය",
    "Enter promo code": "වට්ටම් කේතය ඇතුළත් කරන්න",
    "Remove": "ඉවත් කරන්න",
    "Apply": "යොදන්න",
    "Subtotal": "එකතුව",
    "Subtotal ·": "එකතුව ·",
    "item": "අයිතම",
    "items": "අයිතම",
    "Shipping": "බෙදාහැරීම",
    "Taxes": "බදු",
    "Total": "මුළු මුදල",
    "Continue to payment": "ගෙවීමට ඉදිරියට යන්න",
    "Add to cart": "බහලුමට එකතු කරන්න",
    "Coming Soon": "ඉදිරිදින",
    "In stock": "ගබඩාවේ ඇත",
    "Read more": "තවත් කියවන්න",
    "Save": "සුරකින්න",
    "Search": "සොයන්න",

    "Name": "නම",
    "Phone": "දුරකථන",
    "Email": "විද්‍යුත් තැපෑල",
    "How can we help?": "අපි ඔබට කෙසේ සහය විය හැකිද?",
    "Send enquiry": "විමසුම යවන්න",
    "Submitting...": "යවමින්...",
    "My profile": "මගේ පැතිකඩ",
    "My inquiries": "මගේ විමසුම්",
    "My quotations": "මගේ මිල ගණන්",
    "My Orders": "මගේ ඇණවුම්",
    "My Wishlist": "මගේ පෙළගැස්ම",
    "Saved Addresses": "සුරකිණු ලිපින",
    "Account Settings": "ගිණුම් සැකසුම්",
    "Overview": "සාරාංශය",
    "Save changes": "වෙනස්කම් සුරකින්න",
    "Cancel": "අවලංගු කරන්න",
    "Upload profile photo": "පැතිකඩ ඡායාරූපය උඩුගත කරන්න",
    "Remove photo": "ඡායාරූපය ඉවත් කරන්න",
    "Profile updated": "පැතිකඩ යාවත්කාලීන විය",
    "No inquiries yet": "තවම විමසුම් නැත",
    "No quotations yet": "තවම මිල ගණන් නැත",
    "Pending": "බලාසිටින",
    "In Progress": "ක්‍රියාත්මක වේ",
    "Completed": "සම්පූර්ණයි",
    "Rejected": "ප්‍රතික්ෂේපයි",
  },
  ta: {
    "The workshop partner": "பணிமனை துணை",
    "Make more.": "மேலும் உருவாக்குங்கள்.",
    "Make it better.": "இன்னும் சிறப்பாகச் செய்யுங்கள்.",
    "Explore equipment": "உபகரணங்களைப் பார்க்க",
    "Talk to a specialist": "நிபுணருடன் பேசுங்கள்",
    "Find your fit": "உங்கள் தேவைக்கு பொருந்தியதைத் தேர்வு செய்யுங்கள்",
    "What are you making?": "நீங்கள் என்ன தயாரிக்கிறீர்கள்?",
    "Production process": "உற்பத்தி செயல்முறை",
    "What Are We Making?": "நாம் என்ன தயாரிக்கிறோம்?",
    "Cutting and Preparation": "வெட்டுதல் மற்றும் தயாரிப்பு",
    "Embroidery and Detail": "எம்பிராய்டரி மற்றும் விவரம்",
    "Sewing and Construction": "தையல் மற்றும் கட்டமைப்பு",
    "Finishing and Pressing": "முடித்தல் மற்றும் அழுத்தம்",
    "Lowest Price Guaranteed": "குறைந்த விலை உத்தரவாதம்",
    "Special discounts available": "சிறப்பு தள்ளுபடிகள் உள்ளன",
    "Equipment": "உபகரணங்கள்",
    "Parts & Supplies": "பாகங்கள் & பொருட்கள்",
    "Services & Support": "சேவைகள் & உதவி",
    "Sewing Machines": "தையல் இயந்திரங்கள்",
    "Cutting": "வெட்டுதல்",
    "Ironing & Finishing": "அயர்ன் & முடித்தல்",
    "Embroidery": "எம்பிராய்டரி",
    "Home Appliances": "வீட்டு உபகரணங்கள்",
    "Spare Parts": "பாகங்கள்",
    "Needles": "கம்பிகள்",
    "Accessories": "துணைப்பொருட்கள்",
    "Brands": "பிராண்டுகள்",
    "Services & Repair": "சேவை & பழுது",
    "Installments": "தவணைகள்",
    "Track Order": "ஆர்டரை கண்காணிக்க",
    "Apply for Credit Account": "கடன் கணக்குக்கு விண்ணப்பிக்க",
    "News / Blog": "செய்தி / வலைப்பதிவு",
    "Contact": "தொடர்பு",
    "Search machines, parts and brands": "இயந்திரங்கள், பாகங்கள் மற்றும் பிராண்டுகளைத் தேடுங்கள்",
    "Wishlist": "விருப்பப்பட்டியல்",
    "Cart": "வண்டி",
    "Account": "கணக்கு",
    "Search": "தேடு",
    "Product Index": "தயாரிப்பு பட்டியல்",
    "Customer Support": "வாடிக்கையாளர் உதவி",
    "About Us": "எங்களைப் பற்றி",
    "Contact Us": "எங்களைத் தொடர்பு கொள்ள",
    "Visit Our Showroom": "எங்கள் காட்சியகத்திற்கு வருக",
    "Stay in the loop": "புதிய தகவல்களைப் பெறுங்கள்",
    "Subscribe": "சந்தா செலுத்து",
    "Mon–Sat: 9:00 AM – 7:00 PM": "திங்கள்–சனி: காலை 9:00 – மாலை 7:00",
    "Contact information": "தொடர்பு தகவல்",
    "Log in": "உள்நுழைக",
    "Email address": "மின்னஞ்சல் முகவரி",
    "Create an account": "கணக்கு உருவாக்க",
    "Password": "கடவுச்சொல்",
    "Confirm password": "கடவுச்சொல்லை உறுதிப்படுத்து",
    "Passwords do not match.": "கடவுச்சொற்கள் பொருந்தவில்லை.",
    "Delivery": "விநியோகம்",
    "Ship": "அனுப்புதல்",
    "Store Pickup": "கடைப் பெறுதல்",
    "Billing address": "பில்லிங் முகவரி",
    "Shipping address": "விநியோக முகவரி",
    "Payment options": "கட்டண விருப்பங்கள்",
    "Promo code": "தள்ளுபடி குறியீடு",
    "Enter promo code": "தள்ளுபடி குறியீட்டை உள்ளிடுங்கள்",
    "Remove": "அகற்று",
    "Apply": "பயன்படுத்து",
    "Subtotal": "துணைத் தொகை",
    "Subtotal ·": "துணைத் தொகை ·",
    "item": "பொருள்",
    "items": "பொருட்கள்",
    "Shipping": "விநியோகம்",
    "Taxes": "வரி",
    "Total": "மொத்தம்",
    "Add to cart": "வண்டியில் சேர்க்க",
    "Coming Soon": "விரைவில்",
    "In stock": "கையிருப்பில்",
    "Read more": "மேலும் படிக்க",
    "Name": "பெயர்",
    "Phone": "தொலைபேசி",
    "Email": "மின்னஞ்சல்",
    "Send enquiry": "விசாரணை அனுப்பு",
    "Submitting...": "அனுப்புகிறது...",
    "My profile": "என் சுயவிவரம்",
    "My inquiries": "என் விசாரணைகள்",
    "My quotations": "என் விலைமேற்கோள்கள்",
    "My Orders": "என் ஆர்டர்கள்",
    "My Wishlist": "என் விருப்பப்பட்டியல்",
    "Saved Addresses": "சேமித்த முகவரிகள்",
    "Account Settings": "கணக்கு அமைப்புகள்",
    "Overview": "கண்ணோட்டம்",
    "Save changes": "மாற்றங்களைச் சேமி",
    "Cancel": "ரத்து",
    "Remove photo": "புகைப்படத்தை அகற்று",
    "Profile updated": "சுயவிவரம் புதுப்பிக்கப்பட்டது",
    "Pending": "நிலுவையில்",
    "In Progress": "செயல்பாட்டில்",
    "Completed": "முடிந்தது",
    "Rejected": "நிராகரிக்கப்பட்டது",
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  translate: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("smart-apparel-language");
    if (stored === "en" || stored === "si" || stored === "ta") {
      const frame = window.requestAnimationFrame(() => setLanguageState(stored));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    localStorage.setItem("smart-apparel-language", next);
  };

  const t = (key: keyof typeof translations.en) =>
    translations[language][key as keyof typeof translations.en] ?? translations.en[key];

  useEffect(() => {
    document.documentElement.lang = language === "si" ? "si" : language === "ta" ? "ta" : "en";
    document.documentElement.dataset.language = language;
  }, [language]);

  const translate = (text: string) =>
    language === "en" ? text : interfaceTranslations[language][text] || text;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
