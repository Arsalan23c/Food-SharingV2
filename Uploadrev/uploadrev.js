import {
    doc,
    getDoc,
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc,
    auth, onAuthStateChanged,
} from "../utils/utils.js";


const logoutBtn = document.getElementById('logout_btn')
const loginLink = document.getElementById('loginLink')
const userImg = document.getElementById('userImg')

console.log(auth);


const uploadform = document.getElementById('upload-form')
const Uploadbtn = document.getElementById('upload-btn')

uploadform.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e);

    Uploadbtn.disabled = true
    Uploadbtn.innerText = "loading...."

    const uploadInfo = {
        foodPic: e.target[0].files[0],
        foodName: e.target[1].value,
        foodLocation: e.target[2].value,
        createdBy : auth.currentUser.uid,
        createdByEmail : auth.currentUser.email,

        likes:[],
    }

    console.log("uploadinfo =>", uploadInfo);

    const imgRef = ref(storage, uploadInfo.foodPic.name)
    uploadBytes(imgRef, uploadInfo.foodPic).then(() => {
        console.log("file upload done");
        getDownloadURL(imgRef).then((url) => {
            console.log("url agya", url);
            uploadInfo.foodPic = url;

          // add upload collection

            const uploadCollection = collection(db, 'events')
            addDoc(uploadCollection ,uploadInfo).then(()=>{
                console.log('document added');
                window.location.href = '/'
            })



        })
    })
})


function getUserInfo(uid){
    const userRef = doc(db,'users',uid);
    getDoc(userRef).then((data) =>{
      console.log("dataid=>" ,data.id);
      console.log("data=>" ,data.data());
      userImg.src =  data.data().img;
    })
  }

  

   

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