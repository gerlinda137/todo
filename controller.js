import * as Model from "./model.js";
import * as View from "./view.js";
import * as ViewAuth from "./view-auth.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABHPMIaSStJbYY8wKz8ml7C14dv4jiukA",
  authDomain: "todo-7eee9.firebaseapp.com",
  projectId: "todo-7eee9",
  storageBucket: "todo-7eee9.appspot.com",
  messagingSenderId: "791119799586",
  appId: "1:791119799586:web:50df20db598890a646717b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

function authError(errorMessage) {
  ViewAuth.error();
  View.showError(errorMessage);
}

function login(email, password) {
  View.hideError();
  ViewAuth.showProgressLoader();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      // alert("user signed in");
      //userNameInHeader.textContent = email;

      const databaseRef = ref(database);
      const userId = user.uid;

      get(child(databaseRef, `users/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            const userData = snapshot.val();
            // userNameInHeader.textContent = userData.name;
            const userModel = userData.model;
            // console.log(userModel);
            Model.rewriteModel(userModel);

            ViewAuth.hide();
          } else {
            authError("No data available");
          }
        })
        .catch((error) => {
          authError(error.message);
          ViewAuth.hideProgressLoader();
        });
    })
    .catch((error) => {
      authError(error.message);
      ViewAuth.hideProgressLoader();
    });
}

function signUp(name, email, password) {
  View.hideError();
  ViewAuth.showProgressLoader();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userId = user.uid;
      // ...

      //write to database
      set(ref(database, "users/" + userId), {
        email,
        name,
      });

      ViewAuth.hide();

      Model.rewriteModel(Model.generateInitialModel());

      // alert("user signed");
      // const userNameInHeader = document.querySelector(".user-manu__username");
      // userNameInHeader.textContent = email; // TODO: this is the part of main screen
    })
    .catch((error) => {
      authError(error.message);
      ViewAuth.hideProgressLoader();
    });
}

showAuth();

const logoutBtn = document.querySelector("#logoutbtn");

logoutBtn.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      showAuth();
    })
    .catch((error) => {
      View.showError(error.message);
    });
  ViewAuth.hideProgressLoader();
});

function showAuth() {
  ViewAuth.show(login, signUp);
  View.hideError();
}

//сохранение данных в о карточках в бд

function pushDataToDb() {
  const model = Model.getModel();
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;
    update(ref(database, "users/" + userId), {
      model,
    });
  } else {
    console.log("Не войдено");
  }
}

Model.addEventListenerOnModelChanged(pushDataToDb);
