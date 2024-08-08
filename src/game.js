import { change_board_to } from './board';
import { footer } from './footer';
import score_bar from './score-bar';

export default function game(){
    document.querySelector('#app').innerHTML = 
    `<div class="score-bar"></div>
      <div class="board"></div>
      <div class="footer"></div>
      <button onclick="window.router('/login')"></button>
      `;

//Init 
score_bar(document.querySelector(".score-bar"),(localStorage.getItem("score") | 0));
change_board_to().triple_options(document.querySelector(".board"));
footer(document.querySelector(".footer"));
}