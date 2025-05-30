import { renderProducts } from "./render.js";
import {
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "../firbase/firebase-connection.js";


export async function displayProducts(container) {
  //  const container = document.getElementById("product-container");
  if (!container) return;

  try {
    container.innerHTML =
      '<div class="text-center py-5"><i class="fas fa-spinner fa-spin fa-3x"></i></div>';
    const snapshot = await getDocs(collection(db, "products"));
    const allProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched products:", allProducts);
    renderProducts(container, allProducts); // تم تصحيح هذه السطر
    return allProducts;
  } catch (error) {
    console.error("Error loading products:", error);
    container.innerHTML = `
      <div class="alert alert-danger text-center">
        <i class="fas fa-exclamation-triangle"></i>
        فشل تحميل المنتجات. الرجاء المحاولة لاحقاً.
      </div>`;
    return [];
  }
}
