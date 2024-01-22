import { auth, usersRef, productsRef } from "../store/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
export const useCart = () => {
    const addToCart = async(productObj) => { // Obj
        try {
            const userID = auth.currentUser?.uid || localStorage.getItem('userID');
            if(!userID) return;
            const userDocRef = doc(usersRef, userID);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();

            const updatedCart = [productObj, ...userData.cart];
            await updateDoc(userDocRef, {
                cart: updatedCart,
            });         

            const productDocRef = doc(productsRef, productObj.id);
            const productDocSnap = await getDoc(productDocRef);
            const productData = productDocSnap.data();
            await updateDoc(productDocRef, {
                stock: productData.stock - 1,
            });
        } catch(error) {
            console.log(error.message);
        }
    };

    const removeFromCart = async(productID) => { // String
        try {
            const userID = auth.currentUser?.uid || localStorage.getItem('userID');
            if(!userID) return;
            const userDocRef = doc(usersRef, userID);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();

            let updatedCart = [];
            if(userData.cart.length > 1) {
                updatedCart = userData.cart.filter((productObj) => {
                    if(productObj.id != productID) return true;   
                });
            };

            console.log(updatedCart);
            await updateDoc(userDocRef, {
                cart: updatedCart,
            });

            const productDocRef = doc(productsRef, productID);
            const productDocSnap = await getDoc(productDocRef);
            const productData = productDocSnap.data();
            await updateDoc(productDocRef, {
                stock: productData.stock + 1,
            });

        } catch(error) {
            console.log(error.message);
        }
    };
    return {addToCart, removeFromCart};
};