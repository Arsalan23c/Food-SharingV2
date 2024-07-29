import { auth, signInWithEmailAndPassword
     } from "../../utils/utils.js";

     const loginform = document.getElementById('login_form')
    //  const submitbtn = document.getElementById('submit')


     
    loginform.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = e.target[0].value
    const pass = e.target[1].value

    console.log("email=>" , email);
    console.log("pass=>" , pass);

    signInWithEmailAndPassword(auth,email,pass).then(()=>{
        window.location.href = '/'
    }).catch((err) => alert(err));

    })

    


