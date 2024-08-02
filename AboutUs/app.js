import { auth, storage, getFirestore,
    db, onAuthStateChanged, 
    signOut, doc, getDoc, getDocs,deleteDoc, collection, updateDoc, arrayUnion, arrayRemove, query, where} from "../utils/utils.js";

    const logoutBtn = document.getElementById('logout_btn')
    const loginLink = document.getElementById('loginLink')
    const userImg = document.getElementById('userImg')
    const myUploadPage = document.getElementById('myUploadpage');
const myLikespage = document.getElementById('myLikespage');
const Uploadrevpage = document.getElementById('Uploadrevpage');

onAuthStateChanged(auth, (user) => {
    if (user) {
  
      const uid = user.uid;
  
      loginLink.style.display = 'none';
      userImg.style.display = 'inline-block';
      getUserInfo(uid);
      logoutBtn.style.display = 'block';
      myUploadPage.style.display = 'block';
      myLikespage.style.display = 'block';
      Uploadrevpage.style.display = 'block';
      // console.log('User Id',uid);
      // ...
    } else {
      // window.location.href = "/auth/login/index.html";
      loginLink.style.display = 'inline-block'
      userImg.style.display = 'none';
      logoutBtn.style.display = 'none';
      myUploadPage.style.display = 'none';
      myLikespage.style.display = 'none';
      Uploadrevpage.style.display = 'none';
    }
    });

    function getUserInfo(uid){
        const userRef = doc(db,'users',uid);
        getDoc(userRef).then((data) =>{
          console.log("dataid=>" ,data.id);
          console.log("data=>" ,data.data());
          userImg.src =  data.data().img;
        })
      }