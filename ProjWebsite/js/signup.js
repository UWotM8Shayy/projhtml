import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyChk7OPRWXvCONLbrCpNoN7nl2iq-XwGNw",
    authDomain: "fbtest-f7dc6.firebaseapp.com",
    projectId: "fbtest-f7dc6",
    storageBucket: "fbtest-f7dc6.appspot.com",
    messagingSenderId: "416701225763",
    appId: "1:416701225763:web:e8cf4837b2ee697aca0a96",
    databaseURL: "https://fbtest-f7dc6-default-rtdb.europe-west1.firebasedatabase.app/"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const signupUsername = document.getElementById("signupUsername").value;
    const signupPassword = document.getElementById("signupPassword").value;
    const signupEmail = document.getElementById("signupEmail").value;
    const profilePhoto = document.getElementById("profilePhoto").files[0];

    const usernameExists = await checkUsernameExists(signupUsername);
    if (!usernameExists) {
        // Upload profile photo to Firebase Storage
    const storageRef = ref(storage, 'profilePhotos/' + signupUsername + '/' + profilePhoto.name);
    const uploadTask = uploadBytesResumable(storageRef, profilePhoto);


    uploadTask.on('state_changed', 
        (snapshot) => {
       
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle errors during upload
            console.error('Error uploading file:', error);
        },
        async () => {
            
            const photoUrl = await getDownloadURL(uploadTask.snapshot.ref);

          
            await setDoc(doc(db, "users", signupUsername), {
                username: signupUsername,
                password: signupPassword,
                email: signupEmail,
                photoUrl: photoUrl 
                
            });

            console.log("Signup successful for user: " + signupUsername);
   
            window.location.href = "/html/login.html";
        }
    );
    }
    else alert("username already taken");

    
});

async function checkUsernameExists(username) {
    const userDocRef = doc(db, "users", username);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists();
}
