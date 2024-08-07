import {
  auth, storage, getFirestore,
  db, onAuthStateChanged,
  signOut, doc, getDoc, getDocs, deleteDoc, collection, updateDoc, arrayUnion, arrayRemove, query, where
} from "../utils/utils.js";

const logoutBtn = document.getElementById('logout_btn')
const loginLink = document.getElementById('loginLink')
const userImg = document.getElementById('userImg')
onAuthStateChanged(auth, (user) => {
  if (user) {

    const uid = user.uid;

    loginLink.style.display = 'none';
    userImg.style.display = 'inline-block';
    getUserInfo(uid);
    logoutBtn.style.display = 'block';
    // console.log('User Id',uid);
    // ...
  } else {
    // window.location.href = "/auth/login/index.html";
    loginLink.style.display = 'inline-block'
    userImg.style.display = 'none';
    logoutBtn.style.display = 'block';
  }
});


// function getUserInfo(uid){
//     const userRef = doc(db,'users',uid);
//     getDoc(userRef).then((data) =>{
//       console.log("dataid=>" ,data.id);
//       console.log("data=>" ,data.data());

//       userImg.src =  data.data().img;
//     })
//   }

const flName = document.getElementById('flName')
const pimail = document.getElementById('pimail')
const piImg = document.getElementById('piImg')
          
    


function getUserInfo(uid) {
  const userRef = doc(db, 'users', uid);
  getDoc(userRef).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      console.log("User ID:", uid);
      console.log("User Data:", userData);
      console.log("Email:", userData.email); // Log the email
      console.log("Email:", userData.fname); // Log the email
      console.log("Email:", userData.img); // Log the email
      
             
      
      flName.innerText = userData.fname + ' ' + userData.lname;
      pimail.innerText = userData.email
      piImg.innerHTML = ` <img src="${userData.img}" alt="">`




    }
  }).catch((error) => {
    console.error("Error getting document:", error);
  })
}