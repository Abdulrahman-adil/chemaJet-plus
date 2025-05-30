import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyDur0lP8dyY7Rmv40TS8BMtTe1DOdb44zw",
  authDomain: "chemajet-store-f872f.firebaseapp.com",
  projectId: "chemajet-store-f872f",
  storageBucket: "chemajet-store-f872f.appspot.com",
  messagingSenderId: "984454162444",
  appId: "1:984454162444:web:e5a49ca4a7c9bebeec2629",
  measurementId: "G-SYHPQFZFR3",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// استخراج ID من الرابط
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function loadProductDetails() {
  if (!productId)
    return (document.getElementById("title").textContent =
      "لم يتم تحديد منتج.");

  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("title").textContent = data.productName;
    document.getElementById("description").textContent = data.description;
    document.getElementById("details").textContent = data.details;
    document.getElementById("product-img").src = data.img;
  } else {
    document.getElementById("title").textContent = "المنتج غير موجود.";
  }
}

loadProductDetails();

// Remove Loadding after viwiong the products
// document.getElementById("loading-overlay").style.display = "none";

// window.addEventListener("load", () => {
//   const loader = document.querySelector(".loading-overlay");
//   if (loader) {
//     loader.style.opacity = "0";
//     setTimeout(() => {
//       loader.style.display = "none";
//     }, 500); // وقت الترانزيشن
//   }
// });
