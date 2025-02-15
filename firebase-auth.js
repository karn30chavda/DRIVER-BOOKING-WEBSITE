// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyD-yskwM8Ak2Zqc5AO5WVjYFNksWQtk-bc",
 authDomain: "designated-driver-service-123.firebaseapp.com",
 databaseURL: "https://designated-driver-service-123-default-rtdb.firebaseio.com",
 projectId: "designated-driver-service-123",
 storageBucket: "designated-driver-service-123.appspot.com",
 messagingSenderId: "709589312938",
 appId: "1:709589312938:web:e6d520a340c2892569b7d3",
 measurementId: "G-NEC0RXRM2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// hide user and driver in navigation bar after signup or login 
const profileLoginLink = document.getElementById('profile-login-link');
const userLoginLink = document.getElementById('user-login-link');
const driverLoginLink = document.getElementById('driver-login-link');
const bookingLink = document.getElementById('booking-link');
const dropprofile = document.getElementById('dropprofile');
const dropbooking = document.getElementById('dropbooking');

document.addEventListener('DOMContentLoaded', function () {
 // Sign-Up Function
 document.getElementById('sign-up-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('eemail_signup').value;
  const password = document.getElementById('lpassword_signup').value;
  const username = document.getElementById('fname').value;

  createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed in 
    updateProfile(userCredential.user, {
     displayName: username
    }).then(() => {
     alert("Sign up successful! Welcome, " + username + "!");
     window.location.href = 'home.html'; // Redirect to home.html
    });
   })
   .catch((error) => {
    console.log("Error Code:", error.code);
    console.log("Error Message:", error.message);
    alert("Error: " + error.message);
   });
 });
 // Login Function
 document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('eemail_login').value;
  const password = document.getElementById('lpassword_login').value;

  signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed in 
    const username = userCredential.user.displayName || "User"; // Default to "User" if displayName is null
    alert("Login successful! Welcome, " + username + "!");
    window.location.href = 'home.html'; // Redirect to home.html
   })
   .catch((error) => {
    const errorMessage = error.message;
    alert("Error: " + errorMessage);
   });
 });

 // Password Reset Functionality
 document.getElementById('forgot-password').addEventListener('click', function (event) {
  event.preventDefault();
  const email = prompt("Please enter your email address for password reset:");
  if (email) {
   sendPasswordResetEmail(auth, email)
    .then(() => {
     alert("Password reset email sent. Please check your email.");
    })
    .catch((error) => {
     console.error("Error sending password reset email:", error);
     alert("Error: " + error.message);
    });
  } else {
   alert("Email address is required!");
  }
 });
});

document.addEventListener('DOMContentLoaded', function () {
 // Sign-Up Function
 document.getElementById('driversign-up-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('drivereemail_signup').value;
  const password = document.getElementById('driverlpassword_signup').value;
  const username = document.getElementById('driverfname').value;

  createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed in 
    updateProfile(userCredential.user, {
     displayName: username
    }).then(() => {
     alert("Sign up successful! Welcome, " + username + "!");
     window.location.href = 'home.html'; // Redirect to home.html
    });
   })
   .catch((error) => {
    console.log("Error Code:", error.code);
    console.log("Error Message:", error.message);
    alert("Error: " + error.message);
   });
 });
 // Login Function
 document.getElementById('driverlogin-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('drivereemail_login').value;
  const password = document.getElementById('driverlpassword_login').value;

  signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed in 
    const username = userCredential.user.displayName || "User"; // Default to "User" if displayName is null
    alert("Login successful! Welcome, " + username + "!");
    window.location.href = 'home.html'; // Redirect to home.html
   })
   .catch((error) => {
    const errorMessage = error.message;
    alert("Error: " + errorMessage);
   });
 });

 // Password Reset Functionality
 document.getElementById('forgot-password').addEventListener('click', function (event) {
  event.preventDefault();
  const email = prompt("Please enter your email address for password reset:");
  if (email) {
   sendPasswordResetEmail(auth, email)
    .then(() => {
     alert("Password reset email sent. Please check your email.");
    })
    .catch((error) => {
     console.error("Error sending password reset email:", error);
     alert("Error: " + error.message);
    });
  } else {
   alert("Email address is required!");
  }
 });
});

export const logoutUser = () => {
 signOut(auth).then(() => {
  alert("You have been logged out successfully.");
 }).catch((error) => {
  console.error('Logout Failed', error);
  alert("Error logging out: " + error.message);
 });
};
onAuthStateChanged(auth, (user) => {
 if (user) {
  // User is signed in, enable dropdown interactions
  adminIcon.addEventListener("click", function () {
   // Toggle the display property
   dropdownContent.style.display = (dropdownContent.style.display === "none") ? "block" : "none";
  });

  // Close the dropdown if clicked outside of it
  window.addEventListener("click", function (event) {
   if (!adminIcon.contains(event.target)) {
    dropdownContent.style.display = "none";
   }
  });
  
    if (user.photoURL) {
      document.getElementById('userProfileImage').src = user.photoURL;
    }
  
  document.getElementById('login-btn').classList.add('hidden-but-occupying-space');
  profileLoginLink.style.display = 'block';
  bookingLink.style.display = 'block';
  userLoginLink.style.display = 'none';
  driverLoginLink.style.display = 'none';
  document.getElementById('logout').style.display = 'block';
  document.getElementById('logoutweb').style.display = 'block';
 } else {
  // No user is signed in, hide the admin dropdown and logout button
  document.querySelector('.admin-icon .dropdown-content').style.display = 'none';
  document.getElementById('login-btn').classList.remove('hidden-but-occupying-space');
  document.getElementById('login-btn').style.visibility = 'visible';
  profileLoginLink.style.display = 'none';
  bookingLink.style.display = 'none';
  userLoginLink.style.display = 'block';
  driverLoginLink.style.display = 'block';
  dropbooking.style.display = 'none';
  dropprofile.style.display = 'none';
  document.getElementById('logout').style.display = 'none';
  document.getElementById('logoutweb').style.display = 'none';
  document.getElementById('userProfileImage').src = 'images/admin_icon.png';
  
  userProfileImage.style.width = '3rem'; 
 }
});

