export function filterCategory(btnElement) {
  const selectedCategory = btnElement.dataset.category;

  // إزالة active من كل الأزرار
  document.querySelectorAll(".category-filter .btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // تفعيل الزر الحالي
  btnElement.classList.add("active");

  // جلب كل الكروت
  const allCards = document.querySelectorAll(".product-item");

  allCards.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");

    if (selectedCategory === "all" || itemCategory === selectedCategory) {
      item.style.display = "block";
      item.classList.remove("animate-fade-out");
      item.classList.add("animate-fade-in-up");
    } else {
      item.classList.remove("animate-fade-in-up");
      item.classList.add("animate-fade-out");

      setTimeout(() => {
        item.style.display = "none";
      }, 200);
    }
  });
}
