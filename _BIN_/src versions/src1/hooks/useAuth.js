import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, usersRef } from '../store/firebaseConfig';
import { query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { HOME, LANDINGPAGE } from '../lib/routes';

export const useAuth = () => {
    const navigate = useNavigate();
    const useLogin = async (email, password) => {
        try {
            // Logic: Let's Log them in...
            await signInWithEmailAndPassword(auth, email, password);
            navigate(HOME);
        } catch(error) {
            console.log(error.message)
        }
    };
    const useRegister = async(fullName, userName, password, email, birthdate, gender) => {
        try {
            /*
                1. We need to first look at the user collection to see if the username is taken.
                    1.1 if it is, then lets throw an error.
                    1.2 if it isnt, then lets continue to step 2.
                2. We will first create the account using createUserWithEmailAndPassword method from firebase
                3. After creating the user, lets imediately login them in using await signInWithEmailAndPassword(auth, email, password);
                4. We neeed to also create a new document into the firestore data base containing this information:
                    fullName <-- String
                    userName <-- String
                    email <-- String
                    birthdate <-- date
                    The document id of the document we are creating should match the UID of the of the newly signed in user.
                5. Navigate them to the home page now :)
            */
            // Step 1
            const usernameQuery = await getDocs(query(usersRef, where('username', '==', userName)));
            if (!usernameQuery.empty) throw new Error('Username is already taken.');
            
            // Step 2 and Step 3
            await createUserWithEmailAndPassword(auth, email, password);
            await signInWithEmailAndPassword(auth, email, password);

            // Step 4
            const newUserDocument = doc(usersRef, auth.currentUser.uid);
            await setDoc(newUserDocument, {
                fullname: fullName,
                username: userName,
                email: email,
                birthdate: birthdate,
                gender: gender,
                accountType: 'user',
            });

            // Step 5
            navigate(HOME);
        } catch(error) {
            console.log(error.message)
        }
    };
    const useLogout = async () => {
        try {
            // Logic: Let's Log them out...
            await signOut(auth);
            navigate(LANDINGPAGE);
        } catch(error) {
            console.log(error.message)
        }
    }; 
    return {useLogin, useRegister};
};