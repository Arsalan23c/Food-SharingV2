
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { getAuth , onAuthStateChanged, signInWithEmailAndPassword,
    createUserWithEmailAndPassword , signOut
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";



  import { getFirestore , doc, setDoc,getDoc,getDocs,collection, addDoc, updateDoc, arrayUnion, arrayRemove,query, where,
    deleteDoc,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  import { getStorage , ref , uploadBytes , getDownloadURL,} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";


  const firebaseConfig = {
    apiKey: "AIzaSyCWRuGpZv5gMzRRjsNUZ1onXHjNQW-SuWk",
    authDomain: "fir-v-8d4f3.firebaseapp.com",
    projectId: "fir-v-8d4f3",
    storageBucket: "fir-v-8d4f3.appspot.com",
    messagingSenderId: "539637442578",
    appId: "1:539637442578:web:4c3ad7774ca8dbfc3e90cb",
    measurementId: "G-XMXELT2RCE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const analytics = getAnalytics(app);
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)



  export{ 
    analytics,
    auth,
    storage,
    db,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    doc, setDoc,getDoc,getDocs,
    ref , uploadBytes , getDownloadURL, 
    collection,
    addDoc,
    updateDoc, arrayUnion, arrayRemove,
    getFirestore,query, where,
    deleteDoc,

  };
