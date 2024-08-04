import { onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc,getDocs  } from "firebase/firestore"; 


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = "index.html"
    
  }
});

const logout = document.querySelector("#logout-btn")
logout.addEventListener('click',()=>{
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'index.html '
      }).catch((error) => {
        console.log(error);
     
        
      });
      
})
async function getDataFormFirestore(){
const arr = []
  const querySnapshot = await getDocs(collection(db, "post"));
  querySnapshot.forEach((doc) => {
    arr.push(doc.data())
  });
  console.log(arr);
  
}
getDataFormFirestore()


const form = document.querySelector("#form")
const title = document.querySelector("#title")
const description = document.querySelector("#description")

form.addEventListener('submit', async (event)=>{
event.preventDefault();
console.log(title.value);
console.log(description.value);
console.log(auth.currentUser.uid);
try {
  const docRef = await addDoc(collection(db, "post"), {
   title:title.value,
   description:description.value,
   uid: auth.currentUser.uid
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}


})
