
import { addDoc,getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "../firbase/firebase-connection.js";
import { products } from "./data.js";

// دالة الإضافة
export async function addNewProductsOnly() {
  const existingProducts = await getDocs(collection(db, "products"));
  const existingNames = [];

  existingProducts.forEach((doc) => {
    const data = doc.data();
    if (data.sort !== undefined) {
      existingNames.push(data.sort.toString().trim());
    }
  });

  for (const product of products) {
    const nameKey = product.sort.toString().trim();
    if (!existingNames.includes(nameKey)) {
      try {
        await addDoc(collection(db, "products"), product);
        console.log(`✅ أُضيف المنتج: ${product.sort}`);
      } catch (error) {
        console.error(`❌ خطأ في الإضافة: ${product.sort}`, error);
      }
    } else {
      console.log(`⚠️ المنتج موجود مسبقًا: ${product.sort}`);
    }
  }
}
