import { boardType } from "../lib/board";
import { globalBoard } from "../lib/updateUI";

export function rules() {
  const pic =
    globalBoard.type === boardType.easyMode
      ? "easyModeRules.svg"
      : "hardModeRules.svg";

  return `<div class="modal closed">
        <h2>RULES</h2>
        <img src="/${pic}">
        <p>Press any where to exit</p>
    </div>`;
}
