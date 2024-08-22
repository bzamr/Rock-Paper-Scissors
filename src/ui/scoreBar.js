export default function scoreBar(score) {
  return `
        <span id="title">ROCK<br>PAPER<br>SCISSORS</span>
        <div class="score">
            <span>SCORE</span>
            <span id="scoreNum">${score}</span>
        </div>`;
}
