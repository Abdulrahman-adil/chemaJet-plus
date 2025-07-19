import { renderProductImgs } from "../products/render-product-images.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "../firebase/firebase-connection.js";

// تحديد اللغة الحالية
const currentLang = localStorage.getItem("lang") || "ar";

// قراءة ID من الرابط
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
console.log("🧩 ID:", productId);

async function loadProductDetails() {
  if (!productId) {
    console.error("❌ لا يوجد ID في الرابط");
    return;
  }

  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.error("❌ المنتج غير موجود");
    return;
  }

  const data = docSnap.data();
  console.log("🔥 Product Data:", data);

  const titleEl = document.getElementById("title");
  const descEl = document.getElementById("description");
  const detailsEl = document.getElementById("details");
  const imgEl = document.getElementById("product-img");

  // ✅ دعم الترجمة في البيانات النصية
  if (titleEl) titleEl.textContent = data.productName[currentLang] || "";
  if (descEl) descEl.textContent = data.description[currentLang] || "";
  if (detailsEl) detailsEl.textContent = data.details[currentLang] || "";
  if (imgEl) imgEl.src = data.img;

  const images = data.images || [data.img];
  renderProductImgs(images);

  renderProductBenefits(data.benefits || []);
}

loadProductDetails();

// ✅ ترجمة فوائد المنتج
async function renderProductBenefits(benefits = []) {
  const section = document.getElementById("benefits-section");
  const container = document.getElementById("benefits-container");

  if (!section || !container || !benefits.length) return;

  section.style.display = "block";
  container.innerHTML = "";

  benefits.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100 border-0 shadow-sm text-center">
          <div class="card-body">
            <div class="icon-circle mx-auto mb-3">
              <i class="${item.icon} fa-2x text-success"></i>
            </div>
            <h5 class="card-title">${item.title[currentLang] || ""}</h5>
            <p class="card-text">${item.description[currentLang] || ""}</p>
          </div>
        </div>
      </div>
    `;
  });
}
