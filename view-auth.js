const signUpFormBtn = document.querySelector("#signUpFormBtn");
const authFormBtn = document.querySelector("#authFormBtn");
const authPopupInner = document.querySelector(".auth__inner");
const authWindow = document.querySelector(".auth");
const signUpBtn = authWindow.querySelector("#signup-btn");
const logInBtn = authWindow.querySelector("#login-btn");
const authForm = authWindow.querySelector("#authForm");
const signUpForm = authWindow.querySelector("#signUpForm");
const authTitle = authWindow.querySelector(".auth__title");
const signUpInputsContainer = document.querySelector(".signup__inputs");
const signUpInputs = signUpInputsContainer.querySelectorAll(".input");
const authInputsContainer = document.querySelector(".auth__inputs");
const authInputs = authInputsContainer.querySelectorAll(".input");
const loader = authWindow.querySelector(".loader");

let currentLoginCallback = null;
let currentSignUpCallback = null;

// logicCallback args: email, password
// signUpCallback args: name, email, password
// ui will call only one of them
export function show(loginCallback, signUpCallback) {
  currentLoginCallback = loginCallback;
  currentSignUpCallback = signUpCallback;

  unMarkInputsAsErrored(authInputs);
  unMarkInputsAsErrored(signUpInputs);

  authWindow.classList.remove("hidden");
}

export function showProgressLoader() {
  loader.classList.remove("hidden");
}

export function hideProgressLoader() {
  loader.classList.add("hidden");
}

export function hide() {
  authWindow.classList.add("hidden");

  currentLoginCallback = null;
  currentSignUpCallback = null;
}

export function error() {
  authPopupInner.classList.add("swing");
  markInputsAsErrored(authInputs);
  markInputsAsErrored(signUpInputs);
  setTimeout(() => {
    authPopupInner.classList.remove("swing");
  }, 500);
}

signUpFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.querySelector("#userMail").value;
  let password = document.querySelector("#userPassword").value;
  let name = document.querySelector("#userName").value;

  unMarkInputsAsErrored(authInputs);
  unMarkInputsAsErrored(signUpInputs);

  if (currentSignUpCallback) {
    currentSignUpCallback(name, email, password);
  }
});

authFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.querySelector("#userMailSigned").value;
  let password = document.querySelector("#userPasswordSigned").value;

  unMarkInputsAsErrored(authInputs);
  unMarkInputsAsErrored(signUpInputs);

  if (currentLoginCallback) {
    currentLoginCallback(email, password);
  }
});

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
