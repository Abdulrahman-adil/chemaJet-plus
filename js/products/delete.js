// import { renderProducts } from "./render.js";
import
    {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "../firbase/firebase-connection.js";

export async function deleteAllProducts() {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const deletePromises = snapshot.docs.map((document) =>
      deleteDoc(doc(db, "products", document.id))
    );
    await Promise.all(deletePromises);
    console.log(`🗑️ تم حذف ${snapshot.size} منتج من Firebase`);
  } catch (error) {
    console.error("❌ خطأ أثناء الحذف:", error);
  }
}
