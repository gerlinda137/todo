const root = document.documentElement;
//checking local storage and if no matching - checking mediaqueries

const storageKey = "theme-preference";
let storagedTheme = null;

if (localStorage.getItem(storageKey)) {
  storagedTheme = localStorage.getItem(storageKey);
}

if (storagedTheme !== null) {
  if (storagedTheme == "dark") {
    root.setAttribute("dark", true);
  } else if (storagedTheme == "light") {
    root.removeAttribute("dark");
  }
} else {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("dark", true);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("switcher");

  if (root.hasAttribute("dark")) {
    themeBtn.classList.remove("theme-switcher--dark");
  } else {
    themeBtn.classList.add("theme-switcher--dark");
  }

  themeBtn.addEventListener("click", () => {
    toggleTheme();
    const isDark = root.hasAttribute("dark");
    localStorage.setItem("theme-preference", isDark ? "dark" : "light");
  });
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    toggleTheme();
  });

function toggleTheme() {
  const themeBtn = document.getElementById("switcher");
  themeBtn.classList.toggle("theme-switcher--dark");
  if (root.hasAttribute("dark")) {
    root.removeAttribute("dark");
  } else {
    root.setAttribute("dark", true);
  }
}

//
