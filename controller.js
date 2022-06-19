import * as Model from "./model.js";
import * as View from "./view.js";

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

// Model.addEventListenerOnModelChanged(View.updateView);

// function storeModel() {
//   const model = Model.getModel();
//   localStorage.setItem("model", JSON.stringify(model));
// }
// Model.addEventListenerOnModelChanged(storeModel);

// let storagedModel = localStorage.getItem("model");
// if (storagedModel !== null) {
//   Model.rewriteModel(JSON.parse(storagedModel));
// } else {
//   Model.rewriteModel(generateDebugModel());
// }

export function generateInitialModel() {
  return {
    columns: [
      {
        id: 0,
        title: "todo",
        cards: [
          {
            id: 0,
            title: "Add your tasks to the board",
            description: "and write some description",
          },
        ],
      },
      {
        id: 1,
        title: "in progress",
        cards: [],
      },
      {
        id: 2,
        title: "done",
        cards: [],
      },
    ],
  };
}

//debug tools
// window.debugModel = model;
// window.testAddCard = () => {
//   changeCardColumn(2, 0);
// };

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
const signUpFormBtn = document.querySelector("#signUpFormBtn");
const authFormBtn = document.querySelector("#authFormBtn");
const logoutBtn = document.querySelector("#logoutbtn");
const authPopupInner = document.querySelector(".auth__inner");
const errorPopup = document.querySelector(".error-message");
const errorPopupTxt = errorPopup.querySelector(".error-message__txt");
const authWindow = document.querySelector(".auth");

function markInputsAsErrored(inputs) {
  for (const input of inputs) {
    input.classList.add("errored");
  }
}

function unMarkInputsAsErrored(inputs) {
  for (const input of inputs) {
    input.classList.remove("errored");
  }
}

signUpFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  errorPopup.classList.add("hidden");
  let email = document.querySelector("#userMail").value;
  let password = document.querySelector("#userPassword").value;
  let name = document.querySelector("#userName").value;
  const userNameInHeader = document.querySelector(".user-manu__username");
  const signUpInputsContainer = document.querySelector(".signup__inputs");
  const signUpInputs = signUpInputsContainer.querySelectorAll(".input");

  unMarkInputsAsErrored(signUpInputs);

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

      alert("user signed");
      authWindow.classList.add("hidden");
      userNameInHeader.textContent = email;
      Model.rewriteModel(generateInitialModel());
    })
    .catch((error) => {
      const errorMessage = error.message;
      // ..
      authPopupInner.classList.add("swing");
      errorPopup.classList.remove("hidden");
      errorPopupTxt.textContent = errorMessage;
      markInputsAsErrored(signUpInputs);
      setTimeout(() => {
        authPopupInner.classList.remove("swing");
      }, 500);
    });
});

authFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  errorPopup.classList.add("hidden");
  let email = document.querySelector("#userMailSigned").value;
  let password = document.querySelector("#userPasswordSigned").value;
  const userNameInHeader = document.querySelector(".user-manu__username");
  const authInputsContainer = document.querySelector(".auth__inputs");
  const authInputs = authInputsContainer.querySelectorAll(".input");

  unMarkInputsAsErrored(authInputs);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      alert("user signed in");
      authWindow.classList.add("hidden");
      //userNameInHeader.textContent = email;

      const databaseRef = ref(database);
      const userId = user.uid;

      get(child(databaseRef, `users/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const userData = snapshot.val();
            userNameInHeader.textContent = userData.name;
            const userModel = userData.model;
            console.log(userModel);
            Model.rewriteModel(userModel);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      authPopupInner.classList.add("swing");
      errorPopup.classList.remove("hidden");
      errorPopupTxt.textContent = errorMessage;
      markInputsAsErrored(authInputs);
      setTimeout(() => {
        authPopupInner.classList.remove("swing");
      }, 500);
    });
});

logoutBtn.addEventListener("click", (e) => {
  errorPopup.classList.add("hidden");
  signOut(auth)
    .then(() => {
      alert("user signed out");
      authWindow.classList.remove("hidden");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      authPopupInner.classList.add("swing");
      errorPopup.classList.remove("hidden");
      errorPopupTxt.textContent = errorMessage;
      setTimeout(() => {
        authPopupInner.classList.remove("swing");
      }, 500);
    });
});

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
