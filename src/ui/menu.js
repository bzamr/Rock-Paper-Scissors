import { getPreferedThemeLocalStorage } from "../lib/helpers";
import { rules } from "./rules";

export function menuBar() {
  return `
    <button id="themeChanger">
        <img src="/${getPreferedThemeLocalStorage()}ModeIcon.svg"/>
    </button>
    <button id="menuButton">
        &#9776; Menu
    </button>
    <a href="https://github.com/bzamr/Rock-Paper-Scissors" title="Github Repository">
        <img src="/github-icon-${getPreferedThemeLocalStorage()}.svg" alt="repository link">
    </a>
    ${rules()}
    `;
}
