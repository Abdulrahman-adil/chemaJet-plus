import { products } from "../products/data.js";

const currentLang = localStorage.getItem("lang") || "ar";
const container = document.getElementById("all-products-container");

function renderAllProducts(products) {
  if (!container || !Array.isArray(products)) return;

  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `
      <div class="col-md-3 col-sm-6">
  <div class="product-card border-0 shadow-sm text-center d-flex flex-column h-100 p-3 rounded-3 bg-white">
    <div class="flex-grow-1 d-flex align-items-center justify-content-center mb-3">
      <img
        src="${product.img}"
        class="img-fluid"
        alt="${product.productName[currentLang]}"
        style="max-height: 180px; object-fit: contain"
      />
    </div>
    <div class="mt-auto">
      <h6 class="card-title mb-0 fw-bold text-dark" style="font-size: 1rem;">
        ${product.productName[currentLang]}
      </h6>
    </div>
  </div>
</div>
    `;
  });
}

renderAllProducts(products);
