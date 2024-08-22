import {
  changeThemeIcon,
  getGameModeLocalStorage,
  getPreferedThemeLocalStorage,
  setPreferedThemeLocalStorage,
} from "./helpers";
import { easyModeOptions, hardModeOptions, theCourt } from "./Judge";
import { globalBoard, globalScore, updateUI } from "./updateUI";
import { boardType } from "./board";
import { userToken } from "./formHandler";

export function goHomeButton() {
  document.querySelector("#goHome")?.addEventListener("click", () => {
    window.router("/");
  });
}

export function loginButton() {
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  const disable_input = (en) => {
    password.disabled = en;
    email.disabled = en;
  };
  document.querySelector("#loginButton")?.addEventListener("click", () => {
    disable_input(true);

    userToken.login(email.value.trim(), password.value.trim());
    setTimeout(() => {
      if (userToken.LogedIn) {
        window.router("/");
      } else {
        disable_input(false);
      }
    }, 2500);
  });
}

export function signupButton() {
  const email = document.getElementById("email");
  const password = document.querySelector("#password");
  const name = document.querySelector("#fullname");

  const disableInput = (en) => {
    name.disabled = en;
    password.disabled = en;
    email.disabled = en;
  };
  document.querySelector("#signUpButton").addEventListener("click", () => {
    disableInput(true);
    userToken.signup(
      email.value.trim(),
      password.value.trim(),
      name.value.trim()
    );
    setTimeout(() => {
      if (userToken.LogedIn) {
        window.router("/");
      } else {
        disableInput(false);
      }
    }, 2000);
  });
}

export function boardEasyModeButtons() {
  document.querySelector("#rock").addEventListener("click", () => {
    theCourt(easyModeOptions.rock);
    globalBoard.type = boardType.resultMode;
    updateUI();
  });

  document.querySelector("#paper").addEventListener("click", () => {
    theCourt(easyModeOptions.paper);
    globalBoard.type = boardType.resultMode;
    updateUI();
  });

  document.querySelector("#scissors").addEventListener("click", () => {
    theCourt(easyModeOptions.scissors);
    globalBoard.type = boardType.resultMode;
    updateUI();
  });
}

export function boardResultModeButtons() {
  document.querySelector("#playAgainButton").addEventListener("click", () => {
    globalBoard.type = getGameModeLocalStorage();
    updateUI();
  });
}

export function boardHardModeButtons() {
  boardEasyModeButtons();
  document.querySelector("#lizard").addEventListener("click", () => {
    theCourt(hardModeOptions.lizard);
    globalBoard.type = boardType.resultMode;
    updateUI();
  });

  document.querySelector("#spock").addEventListener("click", () => {
    theCourt(hardModeOptions.spock);
    globalBoard.type = boardType.resultMode;
    updateUI();
  });
}

export function menuButton() {
  document.querySelector("#menuButton")?.addEventListener("click", () => {
    document.querySelector(".layer").classList.toggle("menu-open");
    document.querySelector("nav").classList.toggle("closed");
  });
}

export function navigationButtons() {
  const modal = document.querySelector(".modal");

  document.querySelector("#rules").addEventListener("click", () => {
    document.querySelector(".layer").classList.toggle("menu-open");
    document.querySelector("nav").classList.toggle("closed");
    modal.classList.toggle("closed");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.toggle("closed");
    }
  });

  document.querySelector("#loginButtonNav")?.addEventListener("click", () => {
    window.router("/login");
  });

  document.querySelector("#signupButtonNav")?.addEventListener("click", () => {
    window.router("/signup");
  });

  document.querySelector("#logoutButton")?.addEventListener("click", () => {
    userToken.logout();
    setTimeout(() => {
      if (!userToken.LogedIn) {
        document.querySelector(".layer").classList.toggle("menu-open");
        document.querySelector("nav").classList.toggle("closed");
        window.router("/");
      }
    }, 500);
  });

  document.querySelector("#gameModeChanger")?.addEventListener("click", () => {
    globalBoard.type =
      globalBoard.type === boardType.easyMode
        ? boardType.hardMode
        : boardType.easyMode;
    updateUI();
  });
}

export function themeChangerButton() {
  document.querySelector("#themeChanger")?.addEventListener("click", () => {
    document.querySelector("#app")?.classList.toggle("dark-theme");
    document.querySelector("#app")?.classList.toggle("light-theme");
    if (getPreferedThemeLocalStorage() === "light") {
      setPreferedThemeLocalStorage("dark");
    } else {
      setPreferedThemeLocalStorage("light");
    }
    changeThemeIcon();
  });
}

//helper function , no Listener definition here
export function boardClassAndListener() {
  globalBoard.attachListener();
  globalBoard.toggleClassName();
}
