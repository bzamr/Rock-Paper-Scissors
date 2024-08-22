import { boardType } from "./board";
import { easyModeOptions, hardModeOptions } from "./Judge";
import { globalBoard } from "./updateUI";

//generate random number between 0 and 3
export function genRandNum3() {
  const randomArray = crypto.getRandomValues(new Uint8Array(1));
  const randomNum = randomArray[0] % 3;
  return randomNum;
}

export function genRandNum5() {
  const randomArray = crypto.getRandomValues(new Uint8Array(1));
  const randomNum = randomArray[0] % 5;
  return randomNum;
}

export function computerSelection() {
  if (globalBoard.type === boardType.easyMode) {
    const rnd = genRandNum3();

    if (rnd === 0) {
      return easyModeOptions.rock;
    } else if (rnd === 1) {
      return easyModeOptions.paper;
    } else if (rnd === 2) {
      return easyModeOptions.scissors;
    } else {
      console.error("Ooops! somthing wrong!");
    }
  } else {
    const rnd = genRandNum5();

    if (rnd === 0) {
      return hardModeOptions.lizard;
    } else if (rnd === 1) {
      return hardModeOptions.paper;
    } else if (rnd === 2) {
      return hardModeOptions.spock;
    } else if (rnd === 3) {
      return hardModeOptions.scissors;
    } else if (rnd === 4) {
      return hardModeOptions.rock;
    } else {
      console.error("Ooops! somthing wrong!");
    }
  }
}
