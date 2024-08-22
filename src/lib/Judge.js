import { globalBoard, globalScore, lastResult } from "./updateUI";
import { computerSelection } from "./machineAI";
import { boardType } from "./board";

export const easyModeOptions = Object.freeze({
  rock: Symbol("rock"),
  paper: Symbol("paper"),
  scissors: Symbol("scissors"),
});

export const hardModeOptions = Object.freeze({
  rock: Symbol("rock"),
  paper: Symbol("paper"),
  scissors: Symbol("scissors"),
  lizard: Symbol("lizard"),
  spock: Symbol("spock"),
});

export const Winner = Object.freeze({
  user: Symbol("user"),
  opponent: Symbol("opponent"),
  none: Symbol("none"),
});

export class Result {
  //todo: check param before assign
  #winner;
  #user;
  #opponet;

  constructor() {}
  set winner(param) {
    this.#winner = param;
  }
  get winner() {
    return this.#winner;
  }
  set userSelection(param) {
    this.#user = param;
  }
  get userSelection() {
    return this.#user;
  }
  set computerSelection(param) {
    this.#opponet = param;
  }
  get computerSelection() {
    return this.#opponet;
  }
}

export function easyModeDecision(user, opponent) {
  if (user === opponent) {
    return Winner.none;
  } else if (
    user === easyModeOptions.rock &&
    opponent === easyModeOptions.scissors
  ) {
    return Winner.user;
  } else if (
    user === easyModeOptions.paper &&
    opponent === easyModeOptions.rock
  ) {
    return Winner.user;
  } else if (
    user === easyModeOptions.scissors &&
    opponent === easyModeOptions.paper
  ) {
    return Winner.user;
  } else {
    return Winner.opponent;
  }
}

export function hardModeDecision(user, opponent) {
  if (user === opponent) {
    return Winner.none;
  } else if (
    user === hardModeOptions.rock &&
    (opponent === hardModeOptions.scissors ||
      opponent === hardModeOptions.lizard)
  ) {
    return Winner.user;
  } else if (
    user === hardModeOptions.paper &&
    (opponent === hardModeOptions.rock || opponent === hardModeOptions.spock)
  ) {
    return Winner.user;
  } else if (
    user === hardModeOptions.scissors &&
    (opponent === hardModeOptions.paper || opponent === hardModeOptions.lizard)
  ) {
    return Winner.user;
  } else if (
    user === hardModeOptions.lizard &&
    (opponent === hardModeOptions.paper || opponent === hardModeOptions.spock)
  ) {
    return Winner.user;
  } else if (
    user === hardModeOptions.spock &&
    (opponent === hardModeOptions.scissors || opponent === hardModeOptions.rock)
  ) {
    return Winner.user;
  } else {
    return Winner.opponent;
  }
}

export function judgeDecision(user, opponent) {
  if (globalBoard.type === boardType.easyMode) {
    return easyModeDecision(user, opponent);
  } else {
    return hardModeDecision(user, opponent);
  }
}

export function theCourt(selection) {
  const comSelect = computerSelection();
  const winner = judgeDecision(selection, comSelect);
  lastResult.winner = winner;
  lastResult.userSelection = selection;
  lastResult.computerSelection = comSelect;
  if (winner === Winner.user) {
    globalScore.plus();
  } else if (winner === Winner.opponent) {
    if (globalScore.score > 0) globalScore.minus();
  }
}
