import { productsRef } from "../store/firebaseConfig";
import { deleteDoc, getDocs, query, where, doc, setDoc, getDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref, deleteObject } from "firebase/storage";
import { storage } from "../store/firebaseConfig";

// productsRef is defined like this: export const productsRef = collection(db, 'products');
/* 
    THIS IS THE STRUCTURE OF A DOCUMENTS:
    category: "food"
    description: "This is a really big power thingy. Im not sure too be honest, this is just a test."
    imgURL: "moeDoesntLoveMeAnymoreSadded.com"
    isOnSale: true
    price: 1200
    productName: "6 ft Duracell Battery"
    stock: 7
*/

export const useProduct = () => {
    
    const createProduct = async(productName, description, price, stock, category, imgArr) => {
        try {
            /*
                Logic:
                    UPLOAD THE IMAGE TO STORAGE, THEN LETS GENERATE
                    A LINK TO MAKE THE IMAGE VIEWABLE
                    CREATE THE ITEM IN THE FIRESTORE
            */
            const imageFILE = imgArr[0];
            const productImageRef = ref(storage, `productImages/${imageFILE.name}`);
            const snapshot = await uploadBytesResumable(productImageRef, imageFILE);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const newItemDoc = doc(productsRef);
            await setDoc(newItemDoc, {
                id: newItemDoc.id,
                productName: productName, 
                description: description, 
                price: price, 
                stock: stock, 
                category: category,
                imgURL: downloadURL,
                imageName: imageFILE.name
            });
        } catch(error) {
            console.log(error.message);
        }
    };

    const deleteProduct = async (productID) => {
        try {
            /*
            *    Logic:
            *        FIND THE DOCUMENT, WE NEED TO DELETE FROM THE FIRESTOREE
            *        AND AS WELL DELETE FROM THE FIREBASE STORAGE  
            */
            const productDocRef = doc(productsRef, productID);
            const productDocSnap = await getDoc(productDocRef);
            const productData = productDocSnap.data();
            const productImageRef = ref(storage, `productImages/${productData.imageName}`);
            deleteObject(productImageRef);
            await deleteDoc(productDocRef);
        } catch(error) {
            console.log(error.message);
        }
    };

    const updateProduct = async([]) => {
        try {
            /*
            *    Logic:
            *        THE JUST NEED TO PASS IN AN ARR OF WHAT TO EDIT, then
            *        what we could do is conditionally replace whatever we would need.
            */
        } catch(error) {
            console.log(error.message);
        }
    };
    return {createProduct, deleteProduct};
};