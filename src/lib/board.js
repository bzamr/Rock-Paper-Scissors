import { easyMode, hardMode, resultMode } from "../ui/boards";
import {
  boardEasyModeButtons,
  boardHardModeButtons,
  boardResultModeButtons,
} from "./eventListners";
import { setGameModeLocalStorage } from "./helpers";
import { lastResult } from "./updateUI";

export const boardType = {
  easyMode: Symbol("easyMode"),
  hardMode: Symbol("hardMode"),
  resultMode: Symbol("resultMode"),
};

export class Board {
  #type;
  #markup;
  constructor(type) {
    this.type = type;
  }

  set type(type) {
    if (type in boardType) {
      console.error("provided board type not supported.");
      return undefined;
    }
    if (type !== boardType.resultMode) {
      setGameModeLocalStorage(type);
    }
    this.#type = type;
    this.generateMarkup();
  }

  get type() {
    return this.#type;
  }

  generateMarkup() {
    if (this.#type === boardType.easyMode) {
      this.#markup = easyMode();
    } else if (this.#type === boardType.hardMode) {
      this.#markup = hardMode();
    } else if (this.#type === boardType.resultMode) {
      this.#markup = resultMode(
        lastResult.userSelection.description,
        lastResult.computerSelection.description,
        lastResult.winner
      );
    }
  }

  get markup() {
    if (!this.#markup) {
      console.error("to show result please give us more informations.");
      return undefined;
    }

    return this.#markup;
  }

  attachListener() {
    if (this.#type === boardType.easyMode) {
      boardEasyModeButtons();
    } else if (this.#type === boardType.hardMode) {
      boardHardModeButtons();
    } else if (this.#type === boardType.resultMode) {
      boardResultModeButtons();
    }
  }

  toggleClassName() {
    const element = document.querySelector(".board");

    if (this.#type === boardType.easyMode) {
      element.classList.add("easyMode");
      element.classList.remove("resultMode");
    } else if (this.#type === boardType.resultMode) {
      element.classList.add("resultMode");
      element.classList.remove("easyMode");
    } else {
      element.classList.add("hardMode");
      element.classList.remove("easyMode");
      element.classList.remove("resultMode");
    }
  }
}
