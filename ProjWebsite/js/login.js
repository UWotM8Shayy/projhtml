import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

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

document.getElementById("signupRedirectButton").addEventListener("click", function () {
    window.location.href = "/html/signup.html";
});

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const docRef = doc(db, "users", username); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().password === password) {
        console.log("Login successful! Welcome, " + username);
        // Redirect the user to the dashboard or any other page after successful login
        window.location.href = "/html/home.html?username=" + encodeURIComponent(username);
    } else {
        console.log("Incorrect username or password. Please try again.");
    }

});

