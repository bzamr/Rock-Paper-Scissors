import {change_board_to } from './board';
import score_bar from './score-bar'

export default function update_ui(ctx) {
    if (ctx.board_type === "result"){
        update_score(ctx.result);
    }
    update_board(ctx);
}

let score = localStorage.getItem("score")?localStorage.getItem("score"):0;
function update_score(result){
    if (result.winner === "user"){
        score += 1;
    }else if (result.winner === "opposite") {
        score -= 1;
    }else{
        console.log("unkown winner");
    }
    localStorage.setItem("score",score);
    score_bar(document.querySelector(".score-bar"),score);
}

function update_board(ctx){
    const board = document.querySelector(".board");
    if (ctx.board_type === "triple_options"){
        change_board_to().triple_options(board);
        
    }
    else{
        change_board_to().result(board,ctx.result);

    }
}