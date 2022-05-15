const authWindow = document.querySelector(".auth");
const signUpBtn = authWindow.querySelector("#signup-btn");
const logInBtn = authWindow.querySelector("#login-btn");
const authForm = authWindow.querySelector("#authForm");
const signUpForm = authWindow.querySelector("#signUpForm");
const authTitle = authWindow.querySelector(".auth__title");
const authInputs = authWindow.querySelector(".auth__inputs");

function transformAuthWindow(titleTxt, hidingForm, revealingForm) {
  authTitle.textContent = titleTxt;
  hidingForm.classList.add("hidden");
  revealingForm.classList.remove("hidden");
}

signUpBtn.addEventListener("click", () =>
  transformAuthWindow("Sign Up", authForm, signUpForm)
);
logInBtn.addEventListener("click", () =>
  transformAuthWindow("Log In", signUpForm, authForm)
);
