import scoreBar from "./scoreBar";
import { globalBoard, globalScore } from "../lib/updateUI";
import { menuBar } from "./menu";
import { navigationBar } from "./navigationBar";

export function mainPage() {
  const board = globalBoard.markup;
  return `<div class="layer">
            <div class="score-bar">${scoreBar(globalScore.score)}</div>
            <div class="board">${board}</div>
            <div class="menu">${menuBar()}</div>
            </div>
            <nav class="closed">${navigationBar()}</nav>`;
}
