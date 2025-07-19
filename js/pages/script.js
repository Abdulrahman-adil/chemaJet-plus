import { displayProducts } from "../products/display-products.js";
import { addNewProductsOnly } from "../products/add.js";
import { search } from "../products/search.js";
import { filterCategory } from "../products/category.js";
import { renderMegaMenuLinks } from "../products/megaMenu.js";
import { upsertProducts } from "../products/update.js";
import { deleteAllProducts } from "../products/delete.js";

// DOMContentLoaded - Main Initialization
window.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("product-container");
  const searchInput = document.getElementById("search-box");
  const addBtn = document.getElementById("add-product");

  // Load products on page load
  let allProducts = await displayProducts(container);

  // Search functionality
  if (searchInput) {
    search(searchInput, allProducts, container);
  }

  // Add Product Button
  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      console.log("🟢 تم الضغط على زر Add");
      await addNewProductsOnly();
      await displayProducts(container);
    });
  }

  // Filter by Category
  const categoryButtons = document.querySelectorAll(".category-filter .btn");
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterCategory(btn);
    });
  });
});

// Update Products Button
const updateProductBtn = document.getElementById("update-products");
if (updateProductBtn) {
  updateProductBtn.addEventListener("click", async () => {
    await upsertProducts();
    const container = document.getElementById("product-container");
    if (container) {
      await displayProducts(container);
    }
  });
}
// remove Products Button
const removeProducts = document.getElementById("remove-product");
if (removeProducts) {
  removeProducts.addEventListener("click", async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete all products?"
    );
    if (confirmDelete) {
      await deleteAllProducts();
      const container = document.getElementById("product-container");
      if (container) {
        await displayProducts(container);
      }
    }
  });
}



// Mega Menu Hover Logic
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
    }, 200);
  });

  megaMenu.addEventListener("mouseenter", () => {
    megaMenu.classList.add("show");
  });

  megaMenu.addEventListener("mouseleave", () => {
    megaMenu.classList.remove("show");
  });
}

// Render Mega Menu Links
const megaMenuContainer = document.getElementById("mega-menu-container");
renderMegaMenuLinks(megaMenuContainer);
