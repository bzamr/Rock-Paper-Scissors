import '../styles/style.scss'
import { change_board_to } from './board';
import { footer } from './footer';
import { choice_menu } from './machine-ai';
import score_bar from './score-bar';
import update_ui from './update-ui';


document.querySelector('#app').innerHTML = 
    `<div class="score-bar"></div>
      <div class="board"></div>
      <div class="footer"></div>`;


//Init 

score_bar(document.querySelector(".score-bar"),(localStorage.getItem("score") | 0));
change_board_to().triple_options(document.querySelector(".board"));
footer(document.querySelector(".footer"));