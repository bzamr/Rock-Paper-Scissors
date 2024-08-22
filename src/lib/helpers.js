import { boardType } from "./board";

export function validateEmail(email) {
  const reg = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return String(email).toLowerCase().match(reg);
}

export function validatePassword(password) {
  const reg = new RegExp(/^[A-Za-z]\w{6,14}$/);
  return String(password).toLowerCase().match(reg);
}

export function showToastMessage(message, type) {
  const toast = document.createElement("span");
  toast.classList.add("toast");
  toast.classList.add(type);
  toast.innerText = message;

  document.querySelector(".login-page")?.appendChild(toast);
  document.querySelector(".signup-page")?.appendChild(toast);
  toast.classList.add("fade");
  setTimeout(() => {
    toast.remove();
  }, 2000);
}

function setOnLocalStorage(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch (e) {
    console.error("maybe storage is full or ...");
  }
}

export function getScoreLocalStorage() {
  const value = localStorage.getItem("score");
  if (value) {
    return value;
  } else {
    console.error("score does not exist in Local Storage");
    return 0;
  }
}

export function setScoreLocalStorage(score) {
  setOnLocalStorage("score", score);
}

export function setCookie(val) {
  document.cookie = val;
}

export function getCookie() {
  return document.cookie;
}

export function setGameModeLocalStorage(mode) {
  setOnLocalStorage("mode", mode.description);
}

export function getGameModeLocalStorage() {
  const value = localStorage.getItem("mode");
  if (value && Object.keys(boardType).includes(value)) {
    return boardType[value];
  } else {
    console.error("score does not exist in Local Storage");
    return boardType.easyMode;
  }
}

export function setPreferedThemeLocalStorage(theme) {
  setOnLocalStorage("theme", theme);
}
export function getPreferedThemeLocalStorage() {
  const value = localStorage.getItem("theme");
  if (value) {
    return value;
  } else {
    console.error("theme does not exist in Local Storage");
    return "light";
  }
}

export function changeThemeIcon() {
  const themeButton = document.querySelector("#themeChanger img");
  themeButton.src = `${getPreferedThemeLocalStorage()}ModeIcon.svg`;
  const githubLink = document.querySelector("img[alt='repository link']");
  githubLink.src = `github-icon-${getPreferedThemeLocalStorage()}.svg`;
}
