import './styles/style.scss'
import score_bar from './score-bar'
import { selector } from './selector';
import { footer } from './footer';

document.querySelector('#app').innerHTML = 
    `<div class="score-bar"></div>
      <div class="selector"></div>
      <div class="footer"></div>`;

score_bar(document.querySelector('.score-bar'));
selector(document.querySelector('.selector'));
footer(document.querySelector('.footer'));