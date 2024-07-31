import { choice_menu } from './machine-ai';
import {referee} from './referee'

function triple_options(element){
  if (element.classList.contains("result")){
    element.classList.remove("result");
    element.classList.add("triple");
  }else{
    element.classList.add("triple");

  }
  element.innerHTML =`
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
let rock_btn = document.querySelector('#rock'); 
let paper_btn = document.querySelector('#paper');
let scissors_btn = document.querySelector('#scissors');
let user_choice;
const options = choice_menu();

rock_btn.addEventListener("click", ()=>{
  user_choice = options.rock;
  referee(user_choice);
});

paper_btn.addEventListener("click", ()=>{
  user_choice = options.paper;
  referee(user_choice);
});

scissors_btn.addEventListener("click", ()=>{
  user_choice = options.scissors;
  referee(user_choice);
});

}

function result_view(element,result){
  if (element.classList.contains("triple")){
    element.classList.remove("triple");
    element.classList.add("result");
  }
  let winner;
  if (result.winner === "user"){
    winner = "YOU WIN";
  }else if (result.winner === "opposite"){
    winner = "YOU LOOSE";
  }else {
    winner = "DRAW";
  }

  let user_choice = result.user.description;
  let machine_choice = result.opposite.description;

  element.innerHTML = `
        <div>
          <span>YOU PICKED</span>
           <img src="/${user_choice}.svg" alt="${user_choice}">
        </div>
        <div class="middle">
          <h2>${winner}</h2>
          <button id="play_again_btn">Play Again</button>
        </div>
        <div>
          <span>THE HOUSE PICKED</span>
          <img src="/${machine_choice}.svg" alt="${machine_choice}">
        </div>
  `;
  let play_again_btn = document.querySelector("#play_again_btn")
  play_again_btn.addEventListener("click", ()=>{
    change_board_to().triple_options(element);
});
}

export function change_board_to(){
  return ({
  "triple_options": triple_options,
  // "five_options": five_options,
  "result" : result_view ,
  });
};
