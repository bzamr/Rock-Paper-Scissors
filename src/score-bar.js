let score = 0;

export default function score_bar(element) {
    element.innerHTML = `
        <span id="title">ROCK<br>PAPER<br>SCISSORS</span>
        <div class="score">
            <span>SCORE</span>
            <span>${score}</span>
        </div>`;
}
