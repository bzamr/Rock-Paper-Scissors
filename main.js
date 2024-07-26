import './styles/style.scss'
import score_bar from './score-bar'

document.querySelector('#app').innerHTML = 
    `<div class="score-bar"></div>
      <div class="selector"></div>
      <div class="footer"></div>`;

score_bar(document.querySelector('.score-bar'));