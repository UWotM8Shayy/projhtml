import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
 
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

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', async function() {
    // Retrieve username from URL parameter 'username'
    const username = getUrlParameter('username');
    
    // Retrieve email associated with the username from Firestore
    const userDocRef = doc(db, "users", username);
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (userDocSnapshot.exists()) {
        // User document exists, get the email
        const userEmail = userDocSnapshot.data().email;
        // Fill the email input field with the retrieved email
        document.getElementById('email').value = userEmail;
    } else {
        // User not found, handle accordingly (e.g., show an error message)
        console.error("User not found for username:", username);
    }
});


document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userEmail = document.getElementById("email").value;
    const messageTypeElement = document.querySelector('input[name="messageType"]:checked');
    const userMessage = document.getElementById("message").value;

    if (messageTypeElement) {
        const messageType = messageTypeElement.value;

        const message = {
            email: userEmail,
            type: messageType,
            message: userMessage,
            timestamp: new Date(),
        };

        try {
            await setDoc(doc(db, "messages", userEmail + Date.now()), message);
            console.log("Message added to Firestore:", message);
            // Redirect to home page or any other page after submitting the form
            window.location.href = "/html/home.html?username=" + encodeURIComponent(username);
        } catch (error) {
            console.error("Error adding message to Firestore:", error);
        }
    } else {
        // Handle the case where no radio button is checked
        console.error("Please select a message type.");
    }
});


