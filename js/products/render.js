export function renderProducts(container, products, lang = "ar") {
  if (!container || !Array.isArray(products)) return;
  container.innerHTML = "";

  products.forEach((product, index) => {
    const delayClass = `animate-delay-${(index % 3) + 1}`;
    const productName =
      typeof product.productName === "object"
        ? product.productName[lang] || ""
        : product.productName;
    const description =
      typeof product.description === "object"
        ? product.description[lang] || ""
        : product.description;

    container.innerHTML += `
      <div class="col-md-4 mb-4 product-item animate-fade-in-up ${delayClass}" data-category="${product.category}">
        <div class="card">
          <img src="${product.img}" class="card-img-top" alt="${productName}">
          <div class="card-body text-center">
            <h5 class="card-title">${productName}</h5>
            <p class="card-text text-muted">${description}</p>
            <span class="badge bg-light text-dark border mb-2">${product.category}</span>
            <div class="d-flex justify-content-center gap-2 mt-3">
              <a href="https://wa.me/" target="_blank" class="btn btn-success">
                اطلب الآن
              </a>
              <a href="product.html?id=${product.id}" class="btn btn-outline-success">
                تفاصيل
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}
