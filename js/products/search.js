import { renderProducts } from "../products/render.js";

export function search(inputElement, allProducts, container) {
  inputElement.addEventListener("input", () => {
    const currentLang = localStorage.getItem("lang") || "ar";
    let searchValue = inputElement.value.toLowerCase();

    let productsFiltered = allProducts.filter((product) => {
      const name = product.productName?.[currentLang]?.toLowerCase() || "";
      const desc = product.description?.[currentLang]?.toLowerCase() || "";
      return name.includes(searchValue) || desc.includes(searchValue);
    });

    renderProducts(container, productsFiltered, currentLang);
    console.log("✅ render start", productsFiltered);
  });
}
