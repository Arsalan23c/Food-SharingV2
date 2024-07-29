import { auth, createUserWithEmailAndPassword,
    doc,setDoc,  storage, db,
     ref , uploadBytes , getDownloadURL } from "../../utils/utils.js";

     const signupBtn = document.getElementById('signup_form')
     const submitbtn = document.getElementById('submitbtn')


     
signupBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e) 



    const img = e.target[5].files[0]

    const fname = e.target[0].value
    const lname = e.target[1].value
    const email = e.target[2].value
    const pass = e.target[3].value
    const repass = e.target[4].value
    console.log('img =>',img);

    const userInfo = {
        img,
        fname,
        lname,
        email,
        pass,
        repass,


    };

    // create acc
    
    submitbtn.disabled = true
    submitbtn.innerText = "loading...."

   createUserWithEmailAndPassword(auth, email, pass).then((user)=>{
console.log("user=>", user.user.uid);


// upload user image

const userRef = ref( storage,`user/${user.user.uid}`);


// user ref defined hogyaa

// 

uploadBytes(userRef , img).then(()=>{
    console.log('user image uploaded');
    // getting url of the image we uploaded

 getDownloadURL(userRef).then((url)=>{
    console.log("url agya",url);

    // update user into object
userInfo.img = url

      // create user document refrence
const userDbRef = doc(db, 'users' ,user.user.uid)

setDoc( userDbRef , userInfo).then(() =>{
    console.log('user object updated into DB');
    window.location.href = '/'

     
    // submitbtn.disabled = false
    // submitbtn.innerText = "Submit"
})


 })
 }).catch((err)=>{
    console.log('url nh aya');
    // submitbtn.disabled = false
    // submitbtn.innerText = "Submit"
 


}).catch((err)=>{
    console.log('Error in uploading user image');
    // submitbtn.disabled = false
    // submitbtn.innerText = "Submit"
})


})
.catch((err)=>{

      console.log(userInfo);
    //   submitbtn.disabled = false
    // submitbtn.innerText = "Submit"
})




    })



