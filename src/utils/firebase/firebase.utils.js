// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// These are different packages firebase/auth gives us for authentication 
import {
    getAuth, //setting the auth instance
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from "firebase/auth"

import {
    getFirestore,
    doc, //setting the doc instance
    getDoc,
    setDoc
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9e2vZzm-5eTQlSkRWCRtCKUyhMHvJx_g",
    authDomain: "clothing-website-db-66430.firebaseapp.com",
    projectId: "clothing-website-db-66430",
    storageBucket: "clothing-website-db-66430.appspot.com",
    messagingSenderId: "644253770293",
    appId: "1:644253770293:web:ac656eab570bf0c436477c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider)


// initializing our db 
export const db = getFirestore();


// This Basically creates a user based off the authentication from GoogleAuth. 
// The authentication gives a unique ID which we use per document created 
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    // Creating a document within the provided collections name "users" in the db - A document is in a collection
    const userDocRef = doc(db, "users", userAuth.uid)


    // Retrieving data from the db 
    const userSnapshot = await getDoc(userDocRef);


    // If there is no information matching to be retrieved then this; 
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (err) {
            console.log(err, "Error creating a user")
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}