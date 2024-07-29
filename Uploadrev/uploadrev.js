import {
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc,
    auth,
} from "../utils/utils.js";

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