import { translations } from "./lang-data.js";

window.setLang = function (lang) {
  const current = translations[lang] || translations["ar"];

  // تعديل الترجمة
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (current[key]) el.textContent = current[key];
  });

  // حفظ اللغة
  localStorage.setItem("lang", lang);

  // تغيير لغة واتجاه الصفحة
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // تعديل اتجاه العناصر الخاصة مثل navbar إذا كان في تأثير مباشر
  adjustLayoutDirection(lang);
};

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ar";
  window.setLang(savedLang);
});

function adjustLayoutDirection(lang) {
  const isArabic = lang === "ar";

  // مثال: تغيير اتجاه الـ navbar
  const navbar = document.querySelector(".navbar-nav");
  if (navbar) {
    navbar.classList.toggle("ms-auto", !isArabic); // للعربي: شيل
    navbar.classList.toggle("me-auto", isArabic); // للعربي: أضف
  }

  // لو عندك عناصر أخرى بتحتاج تعديل الاتجاه ضيفها هنا بنفس الفكرة
}
