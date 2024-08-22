import { getCookie, getPreferedThemeLocalStorage, setCookie } from "./helpers";
import { globalBoard, globalScore } from "./updateUI";
import { validateEmail, validatePassword, showToastMessage } from "./helpers";

export class JWTHandler {
  #token;

  constructor() {
    this.LogedIn = false;
    this.#token = this.getFromLocalstorage();
  }

  get token() {
    return this.#token;
  }

  login(email, password) {
    if (!validateEmail(email)) {
      showToastMessage("Please Provide A Valid Email Address", "error");
    } else if (!validatePassword(password)) {
      showToastMessage(
        "Password Must be 6-14 Characters and Contain Alphabet Characters",
        "error"
      );
    } else {
      const form = generateForm({
        email,
        password,
      });

      loginRequestHandler(form).then((val) => {
        if (val) {
          this.LogedIn = true;
          this.writeCookie(val);
          globalScore.sync("get");
        }
      });
    }
  }

  logout() {
    globalScore.sync("set");

    fetch("/api/v1/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ` + userToken.token,
      },
    }).then((res) => {
      res.json().then((js) => {
        switch (res.status) {
          case 401:
            showToastMessage(js.error, "error");
            break;
          case 200:
            showToastMessage(js.message, "success");
            this.LogedIn = false;
            globalScore.score = 0;
            setCookie(`__token__=${this.#token}; Max-Age=0;Secure;`);
            break;
          case 404:
            showToastMessage("Check your Connection", "error");
            break;
          case 500:
            showToastMessage(js.error, "error");
            break;
          default:
            showToastMessage("Unkown Error!", "error");
            break;
        }
      });
    });
  }

  signup(email, password, fullname) {
    if (!validateEmail(email)) {
      showToastMessage("Please Provide A Valid Email Address", "error");
    } else if (!validatePassword(password)) {
      showToastMessage(
        "Password Must be 6-14 Characters and Contain Alphabet Characters",
        "error"
      );
    } else if (fullname.length < 4) {
      showToastMessage("Invalid Name!", "error");
    } else {
      const form = generateForm({
        email,
        password,
        fullname,
        score: globalScore.score,
        preferences: JSON.stringify({
          theme: getPreferedThemeLocalStorage(),
          game_type: globalBoard.type.description,
        }),
      });

      signUpRequestHandler(form).then((val) => {
        if (val) {
          this.login(email, password);
        }
      });
    }
  }

  leaderBoardRequest() {
    return fetch("/api/v1/leaderboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ` + userToken.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((js) => {
        return JSON.parse(js.result);
      });
  }

  writeCookie(val) {
    this.#token = val;
    const expTime = JSON.parse(this.payload()).exp;
    const cookie = `__token__=${val}; Max-Age=${expTime * 60 * 60};Secure;`;
    setCookie(cookie);
  }

  payload() {
    const payloadPart = this.#token.split(".")[1];

    return atob(payloadPart);
  }

  header() {
    const payloadPart = this.#token.split(".")[0];
    return atob(payloadPart);
  }

  getFromLocalstorage() {
    const cookies = getCookie().split(";")[0].split("=")[1];
    if (!cookies) {
      this.LogedIn = false;
      return null;
    } else {
      this.LogedIn = true;
      return cookies;
    }
  }
}

export const userToken = new JWTHandler();

export async function loginRequestHandler(form) {
  const response = await (
    await fetch("/api/v1/login", {
      body: form,
      method: "POST",
    })
  ).json();

  switch (response.status) {
    case 200:
      showToastMessage(response.message, "success");
      return response.token;
    case 401:
      showToastMessage(response.error, "error");
      break;
    case 404:
      showToastMessage("Check your Connection", "error");
      break;
    case 500:
      showToastMessage(response.error, "error");
      break;
    default:
      showToastMessage("Unkown Error!", "error");
      break;
  }

  return null;
}

export async function signUpRequestHandler(form) {
  const response = await (
    await fetch("/api/v1/signup", {
      method: "POST",
      body: form,
    })
  ).json();

  switch (response.status) {
    case 201:
      showToastMessage(response.message, "success");
      return true;
    case 404:
      showToastMessage("Check your Connection", "error");
      break;
    case 400:
      showToastMessage(response.message, "error");
      break;
    case 500:
      showToastMessage(response.message, "error");
      break;
    default:
      showToastMessage("Unkown Error!");
      break;
  }
  return false;
}

export function generateForm(obj) {
  const form = new FormData();
  for (let key in obj) {
    form.append(key, obj[key]);
  }
  return form;
}
