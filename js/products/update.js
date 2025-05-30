import {
  collection,
  getDocs,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "../firbase/firebase-connection.js";
import { products } from "./data.js";

export async function upsertProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  const existingDocs = {};
  snapshot.forEach((doc) => {
    let data = doc.data();
    if (data.sort !== undefined) {
      existingDocs[data.sort] = doc.id;
    }
  });

  for (let product of products) {
    try {
      const existingId = existingDocs[product.sort];
      if (existingId) {
        const docRef = doc(db, "products", existingId);
        await setDoc(docRef, product, { merge: true });
        console.log(`${product.productName} : the product has been updated`);
      } else {
        await setDoc(collection(db, "products"), product);
        console.log(`${product.productName} : the product has been added`);
      }
    } catch (error) {
      console.error(`error: ${product.productName}`);
    }
  }
}
