import { usersRef, auth } from "../store/firebaseConfig";
import { getDocs } from "firebase/firestore";
export const useUser = () => {
    const fetchUserInformation = async (requestedInfo) => {
        try {
            const snap = await getDocs(usersRef);
            const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const user = data.find((data) => data.id === auth.currentUser.uid);
            if(requestedInfo === 'accountType') return user.accountType;
            else if(requestedInfo === 'birthdate') return user.birthdate;
            else if(requestedInfo === 'email') return user.email;
            else if(requestedInfo === 'fullname') return user.fullname;
            else if(requestedInfo === 'gender') return user.male;
            else if(requestedInfo === 'username') return user.username;
            else return null;
        } catch(error) {
            console.log(error.message);
        }
    }
    return {fetchUserInformation};
};