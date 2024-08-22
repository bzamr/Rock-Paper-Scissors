import "../styles/style.scss";
import "../styles/forms.scss";
import router from "./lib/router";
import { changeThemeIcon, setPreferedThemeLocalStorage } from "./lib/helpers";

window.router = router;
window.router("/");

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
if (prefersDarkScheme.matches) {
  setPreferedThemeLocalStorage("dark");
  document.querySelector("#app")?.classList.toggle("light-theme");
  document.querySelector("#app")?.classList.toggle("dark-theme");
} else {
  setPreferedThemeLocalStorage("light");
  changeThemeIcon();
}
