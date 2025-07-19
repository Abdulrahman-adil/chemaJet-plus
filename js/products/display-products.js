import { renderProducts } from "./render.js";
import {
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "../firebase/firebase-connection.js";

const currentLang = localStorage.getItem("lang") || "ar";

export async function displayProducts(container) {
  if (!container) return;

  try {
    container.innerHTML =
      '<div class="text-center py-5"><i class="fas fa-spinner fa-spin fa-3x"></i></div>';

    const snapshot = await getDocs(collection(db, "products"));
    const allProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const firstSix = allProducts.slice(0, 6); // ✅ خدت أول 6 منتجات فقط

    console.log("Fetched products:", firstSix);
    renderProducts(container, firstSix, currentLang);
    return firstSix;
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
