import { displayProducts } from "../products/display-products.js";
import { addNewProductsOnly } from "../products/add.js";
import { search } from "../products/search.js";
import { filterCategory } from "../products/category.js";
import { deleteAllProducts } from "../products/delete.js";
import { upsertProducts } from "../products/update.js";
// loading page
window.addEventListener("DOMContentLoaded", async () => {
  //  DOM
  const container = document.getElementById("product-container");
  const searchInput = document.getElementById("search-box");
  const addBtn = document.getElementById("add-product");

  // loading products
  let allProducts = await displayProducts(container);

  // search functionality
  if (searchInput) {
    search(searchInput, allProducts, container);
  }

  // button event listener
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      console.log("🟢 تم الضغط على زر Add");
      await addNewProductsOnly();
      await displayProducts();
    });
  }

  // الكاتيجوري
  const categoryButtons = document.querySelectorAll(".category-filter .btn");
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterCategory(btn);
    });
  });
});

//delete
// const removeProducts = document.getElementById("remove-product");
// removeProducts.addEventListener("click", async () => {
//   let confirmDelete = confirm("Are you sure you want to delete all products?");
//   if (confirmDelete) {
//     await deleteAllProducts();
//   }
// });

// // update
// // bring the button
const updateProduct = document.getElementById("update-products");
if (updateProduct) {
  updateProduct.addEventListener("click", async () => {
    await upsertProducts();
    await updateProduct(container);
  });
}

// mega menu
const productsLink = document.getElementById("products-link");
const megaMenu = document.getElementById("mega-menu");

if (productsLink && megaMenu) {
  productsLink.addEventListener("mouseenter", () => {
    megaMenu.classList.add("show");
  });

  productsLink.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!megaMenu.matches(":hover")) {
        megaMenu.classList.remove("show");
      }
    }, 300);
  });

  megaMenu.addEventListener("mouseenter", () => {
    megaMenu.classList.add("show");
  });

  megaMenu.addEventListener("mouseleave", () => {
    megaMenu.classList.remove("show");
  });
}

// ✅ إخفاء اللودينج بعد تحميل الصفحة بالكامل
