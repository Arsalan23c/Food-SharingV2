
import { auth, storage, getFirestore,
  db, onAuthStateChanged, 
  signOut, doc, getDoc, getDocs, collection, updateDoc, arrayUnion, arrayRemove} from "./utils/utils.js";

  // console.log('auth=>',auth);
  // console.log('storage=>' ,storage);
  // console.log('db=>', db);

  const logoutBtn = document.getElementById('logout_btn')
  const loginLink = document.getElementById('loginLink')
  const userImg = document.getElementById('userImg')
const uploadCardsContainer  = document.getElementById('uploadCardsContainer')


const myUploadBtn = document.getElementById('my-upload-btn');



  getAllEvents()

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
    logoutBtn.style.display = 'none';
    // myupload-btn.addEventListener('click',()=> {
    //    window.location.href = "/auth/login/index.html";
    // })
  }
  });









  logoutBtn.addEventListener('click' , () => {
    signOut(auth);
  })

  function getUserInfo(uid){
    const userRef = doc(db,'users',uid);
    getDoc(userRef).then((data) =>{
      console.log("dataid=>" ,data.id);
      console.log("data=>" ,data.data());
      userImg.src =  data.data().img;
    })
  }


 async function getAllEvents (){
  try{

    const querySnapshot = await getDocs(collection(db, "events"));
    uploadCardsContainer.innerHTML = ''
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);

     const upload =  doc.data()
     const {foodPic,foodName,foodLocation} = upload;
     const card = `
<div class="card">
  <div class="card-info">
      <img class="card-pic" src="${foodPic}" alt="">
    <!-- <p class="title">Food reviews</p> -->
    
    <button id = ${doc.id} onclick="LikeEvent(this)" class="like-wrapper">
      <input class="check" type="checkbox" />
      <label class="likecontainer1">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon inactive">
          <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path>
        </svg>
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon active">
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
        </svg>
        <div class="checkmark"></div>
        <span class="like-text">${auth?.currentUser && upload?.likes?.includes(auth?.currentUser.uid) ? "Liked..." : "Like"}</span>
      </label>
    </button>

     <div class="food-name">
      ${foodName}
     </div>
     <div class="map">
      <div id="map-width">
      <iframe src=${foodLocation}></iframe>
      </div>
     </div>
  </div>
</div>`;



window.LikeEvent = LikeEvent;
uploadCardsContainer.innerHTML += card;
     console.log("upload=>",upload);


})


  }catch(err){
    alert(err)
  }

  }

  // async function LikeEvent(e){
  //   console.log(e);
  //  if (auth.currentUser) {
  // const docRef =doc(db,'events',doc.id,)
  // updateDoc=(docRef,{
  //   likes : arrayUnion(auth.currentUser.uid)
  // }).then(()=>alert("documet updated"))
  // .catch((err)=>console.log(err));
  //  }
  // //  console.log(auth.currentUser);
  //   else{
  //     window.location.href="/auth/login/index.html"
  //   }

  // }
  async function LikeEvent(button) {
    console.log(button); // Should log the button element
    console.log(button.id); // Should log the button's id
    if (auth.currentUser) {
      console.log(".inner=>",button.innerText);
     
      if (button.innerText =='Liked...'){  try {
        const docRef = doc(db, 'events', button.id);
        await updateDoc(docRef, { likes : arrayRemove(auth.currentUser.uid) });
      button.innerHTML= `<button class="like-wrapper">
        <input class="check" type="checkbox" " />
        <label class="likecontainer1" for="like-toggle">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon inactive">
            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path>
          </svg>
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon active">
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
          </svg>
          <div class="checkmark"></div>
          <span class="like-text">Like</span>
        </label>
      </button>
  `
      } catch (error) {
        console.error('Error updating document: ', error);
      }}
else{
      // }
      try {
        const docRef = doc(db, 'events', button.id);
        await updateDoc(docRef, { likes : arrayUnion(auth.currentUser.uid) });
       button.innerHTML =`<button class="like-wrapper">
        <input class="check" type="checkbox"  />
        <label class="likecontainer1" for="like-toggle">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon inactive">
            <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"></path>
          </svg>
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon active">
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
          </svg>
          <div class="checkmark"></div>
          <span class="like-text">Liked...</span>
        </label>
      </button>
  `
      } catch (error) {
        console.error('Error updating document: ', error);
      }}
    } else {
      window.location.href = "/auth/login/index.html";
    }
  }

 
  /// ${upload?.likes?.length ? upload?.likes?.length:'' }
