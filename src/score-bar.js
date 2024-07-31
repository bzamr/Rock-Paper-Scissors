export default function score_bar(element,score) {
    element.innerHTML = `
        <span id="title">ROCK<br>PAPER<br>SCISSORS</span>
        <div class="score">
            <span>SCORE</span>
            <span id="score-num">${score}</span>
        </div>`;
}



