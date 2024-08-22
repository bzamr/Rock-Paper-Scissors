import { Winner } from "../lib/Judge";

export function easyMode() {
  return `
  <button id="rock">
    <img src="/rock.svg" alt="rock">
  </button>
  <button id="scissors">
    <img src="/scissors.svg" alt="scissors">
  </button>
  <button id="paper">
    <img src="/paper.svg" alt="paper">
  </button>
`;
}

export function resultMode(user, opponent, winner) {
  const winnerTitle =
    winner === Winner.user
      ? "You Win 🏆"
      : winner === Winner.opponent
      ? "You Loose 😞"
      : "Draw 🗿";

  return `
        <div class="pick">
          <span>YOU PICKED</span>
           <img src="/${user}.svg" alt="user select ${user}">
        </div>
        <div class="middle">
          <h2>${winnerTitle}</h2>
          <button id="playAgainButton">Play Again</button>
        </div>
        <div class="pick">
          <span>THE HOUSE PICKED</span>
          <img src="/${opponent}.svg" alt="opponent select ${opponent}">
        </div>
  `;
}

export function hardMode() {
  return `${easyMode()}
    <button id="spock">
    <img src="/spock.svg" alt="spock">
  </button>
  <button id="lizard">
    <img src="/lizard.svg" alt="lizard">
  </button>
  `;
}
