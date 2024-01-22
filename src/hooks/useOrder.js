import { auth, usersRef, orderHistoryRef, pastOrdersRef } from "../store/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
export const useOrder = () => {
    const placeOrder = async(addressIn) => {
        try {
            const userID = auth.currentUser?.uid || localStorage.getItem('userID');
            if(!userID) return;
            const userDocRef = doc(usersRef, userID);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();
            const newPastOrderDocRef = doc(pastOrdersRef);
            await setDoc(newPastOrderDocRef, {
                id: newPastOrderDocRef.id,
                userID: userID,
                order: userData.cart,
                address: addressIn
            });
            const orderHistoryDocRef = doc(orderHistoryRef, userID);
            const orderHistoryDocSnap = await getDoc(orderHistoryDocRef);
            const orderHistoryData = orderHistoryDocSnap.data();
            let updatedHistory = [];
            if(orderHistoryData.pastOrders.length > 0) {    
                console.log(orderHistoryData.pastOrders);
                updatedHistory = [newPastOrderDocRef.id, ...orderHistoryData.pastOrders];
            } else {
                updatedHistory = [newPastOrderDocRef.id];
            }
            await updateDoc(orderHistoryDocRef, {
                pastOrders: updatedHistory,
            });
            await updateDoc(userDocRef, {
                cart: [],
            });
        } catch(error) {
            console.log(error)
        }
    };
    return {placeOrder};
};