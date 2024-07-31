import { auth, storage, getFirestore,
    db, onAuthStateChanged, 
    signOut, doc, getDoc, getDocs,deleteDoc, collection, updateDoc, arrayUnion, arrayRemove, query, where} from "../utils/utils.js";
  
    // console.log('auth=>',auth);
    // console.log('storage=>' ,storage);
    // console.log('db=>', db);
  
    const logoutBtn = document.getElementById('logout_btn')
    const loginLink = document.getElementById('loginLink')
    const userImg = document.getElementById('userImg')
  const uploadCardsContainer  = document.getElementById('uploadCardsContainer')
  

  
    onAuthStateChanged(auth, (user) => {
    if (user) {
  
      const uid = user.uid;
  
      loginLink.style.display = 'none';
      userImg.style.display = 'inline-block';
      getUserInfo(uid);
      getMyEvents(user.uid)
      // console.log('User Id',uid);
      // ...
    } else {
      // window.location.href = "/auth/login/index.html";
      loginLink.style.display = 'inline-block'
      userImg.style.display = 'none';
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
  
    async function getMyEvents(uid) {
      try {
        const q = query(collection(db, 'events'), where("createdBy", "==", uid));
        const querySnapshot = await getDocs(q);
        uploadCardsContainer.innerHTML = '';
    
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          
          const upload = doc.data();
          const { foodPic, foodName, foodLocation } = upload;
          const card = `
    <div class="card">
      <div class="card-info">
        <img class="card-pic" src="${foodPic}" alt="">
        <button id="${doc.id}" onclick="deleteEvent(this)" class="dltbtn">
          <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
            <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
          </svg>
        </button>
        <button id="${doc.id}" class="like-wrapper">
          <input class="check" type="checkbox" />
          <label class="likecontainer1">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon ${auth?.currentUser && upload?.likes?.includes(auth?.currentUser.uid) ? 'active' : 'inactive'}">
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
            </svg>
            <div class="checkmark"></div>
            <span class="like-text">${auth?.currentUser && upload?.likes?.includes(auth?.currentUser.uid) ? "Liked..." : "Like"} ${upload?.likes?.length ? upload?.likes?.length : ''}</span>
          </label>
        </button>
        <div class="food-name">${foodName}</div>
        <div class="map">
      <div id="map-width">
      <iframe src=${foodLocation}></iframe>
      </div>
     </div>
        </div>
      </div>
    </div>`;
          window.deleteEvent = deleteEvent;
          uploadCardsContainer.innerHTML += card;
          console.log("upload =>", upload);
        });
      } catch (err) {
        alert(err);
      }
    }
  
  
  
   async function deleteEvent(e){
console.log(e);

const docRef =doc(db,'events',e.id)
await deleteDoc(docRef)
getMyEvents(auth.currentUser.uid)

   }