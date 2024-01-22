import { auth, usersRef } from "../store/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { storage } from "../store/firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
export const useModal = () => {
    /*ACCOUNT*/
    const uploadProfilePicture = async (imgName, imageArr, currentImgUrl) => {
        try {
            const image = imageArr[0];
            const userID = auth.currentUser?.uid || localStorage.getItem('userID');
            if(!userID) return;
            const userDocRef = doc(usersRef, userID);
            const storageRef = ref(storage, `profileIcons/${image.name}`);
            const uploadedImage = await uploadBytesResumable(storageRef, image);
            const imageLink = await getDownloadURL(uploadedImage.ref);

            await updateDoc(userDocRef, {
                profileImgURL: imageLink,
                profileImgName: image.name,
            });

            if(currentImgUrl === 'https://firebasestorage.googleapis.com/v0/b/getsetgo-f3264.appspot.com/o/productImages%2Faccount-icon.png?alt=media&token=e04a2aec-907b-4637-90c7-32d0b8e87bfb') {
                return;
            } else { // Delete the image from here
                const oldProfileImageRef = ref(storage, `profileIcons/${imgName}`);
                deleteObject(oldProfileImageRef);
            }
        } catch(error) {
            console.log(error.messge);
        }
    };
    function openAccount() {
        document.getElementById("accountPanel").style.width = "300px";
    };
    
    function closeAccount() {
        document.getElementById("accountPanel").style.width = "0";
    };
    /*CART*/
    function openCart() {
        document.getElementById("cartPanel").style.width = "300px";
    } 
    function closeCart() {
        document.getElementById("cartPanel").style.width = "0";
    }

    /*FAQ*/
    function openFAQ() {
        document.getElementById("faqPanel").style.width = "300px";
    } 
    function closeFAQ() {
        document.getElementById("faqPanel").style.width = "0";
    }
    return {
        openAccount, closeAccount, closeCart, 
        openCart, uploadProfilePicture, openFAQ,
        closeFAQ
    };
};