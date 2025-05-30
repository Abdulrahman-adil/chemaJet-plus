
// search in index.html
import { renderProducts } from "../products/render.js";
export function search(inputElement, allProducts, container) {
  inputElement.addEventListener("input", () => {
    let searchValue = inputElement.value.toLowerCase();
    let productsFiltered = allProducts.filter((product) => {
      return (
        product.productName.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue)
      );
    });
    renderProducts(container, productsFiltered);
    console.log("✅ render start", productsFiltered);
  });
} //
