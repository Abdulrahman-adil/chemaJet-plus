import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "../firebase/firebase-connection.js";

/**
 * يرسم الميجا منيو داخل أي عنصر يتم تمريره
 * @param {HTMLElement} containerElem - العنصر اللي هيتم فيه حقن HTML الأعمدة
 */
export async function renderMegaMenuLinks(containerElem) {
  if (!containerElem) {
    console.error("❌ عنصر الميجا منيو غير موجود.");
    return;
  }

  try {
    const currentLang = localStorage.getItem("lang") || "ar";

    const snapshot = await getDocs(collection(db, "products"));
    const categories = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const cat = data.category || "أخرى";

      if (!categories[cat]) {
        categories[cat] = [];
      }

      categories[cat].push({
        name: data.productName?.[currentLang] || "",
        id,
      });
    });

    containerElem.innerHTML = "";

    for (const category in categories) {
      const items = categories[category]
        .map(
          (p) =>
            `<li><a href="product-details.html?id=${p.id}">${p.name}</a></li>`
        )
        .join("");

      containerElem.innerHTML += `
        <div class="col-md-3 product-column">
          <h6>${category}</h6>
          <ul>${items}</ul>
        </div>
      `;
    }

    containerElem.innerHTML += `
      <div class="col-md-3 d-none d-md-block text-center">
        <img
          src="assets/img/ment.jpg"
          alt="product"
          class="img-fluid"
        />
      </div>
    `;
  } catch (error) {
    console.error("⚠️ خطأ أثناء تحميل روابط الميجا منيو:", error);
  }
}
