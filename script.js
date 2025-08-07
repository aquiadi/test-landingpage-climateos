// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX3sz4zgX4NCZ_7be1uRWIVnnyABRwcAc",
  authDomain: "coming-soon-emails.firebaseapp.com",
  projectId: "coming-soon-emails",
  storageBucket: "coming-soon-emails.firebasestorage.app",
  messagingSenderId: "408306020232",
  appId: "1:408306020232:web:d1642739e8c38a2605d43d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to save email to Firebase
async function saveEmail(email) {
    try {
        const docRef = await addDoc(collection(db, "email_subscribers"), {
            email: email,
            timestamp: serverTimestamp(),
            status: 'subscribed'
        });
        console.log("Email saved with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding email: ", error);
        return false;
    }
}

// Handle form submission
document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const submitBtn = document.querySelector('.btn-primary');
    const notification = document.getElementById('notification');
    
    if (email) {
        // Show loading state
        submitBtn.textContent = 'Saving...';
        submitBtn.disabled = true;
        
        // Save to Firebase
        const success = await saveEmail(email);
        
        if (success) {
            // Success notification
            notification.textContent = 'Thanks! We\'ll keep you updated.';
            notification.className = 'notification show';
            
            // Clear form
            document.getElementById('emailInput').value = '';
        } else {
            // Error notification
            notification.textContent = 'Sorry, there was an error. Please try again.';
            notification.className = 'notification show error';
        }
        
        // Reset button
        submitBtn.textContent = 'Notify Me';
        submitBtn.disabled = false;
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});

// Handle demo button click
document.getElementById('demoBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Demo coming soon!');
});
