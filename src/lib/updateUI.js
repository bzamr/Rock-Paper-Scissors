import { mainPage } from "../ui/main";
import { Board, boardType } from "./board";
import { getScoreLocalStorage } from "./helpers";
import { Result } from "./Judge";
import { Score } from "./score";
import {
  boardClassAndListener,
  menuButton,
  navigationButtons,
  themeChangerButton,
} from "./eventListners";

export const globalScore = new Score(getScoreLocalStorage());
export const globalBoard = new Board(boardType.easyMode);
export const lastResult = new Result();

export function updateUI() {
  document.querySelector("#app").innerHTML = mainPage();
  menuButton();
  themeChangerButton();
  navigationButtons();
  boardClassAndListener();
}
