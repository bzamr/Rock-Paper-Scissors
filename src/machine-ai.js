export function generate_random_number(from,to){
    return Math.floor(Math.random()*(to))+from;
}

//posible choice in rock paper scissors game
const choice_simple = Object.freeze({
    rock : Symbol("rock"),
    paper : Symbol("paper"),
    scissors : Symbol("scissors")
});

//return choice_simple 
export function choice_menu() {
    return choice_simple;
}

//return one of choice_simple
export function random_choice(){
    let rnd = generate_random_number(0,3);
    let choice;
    
    switch (rnd) {
        case 0:
            choice = choice_simple.rock;
            break;
        case 1:
            choice = choice_simple.paper;
            break;
        case 2:
            choice = choice_simple.scissors;
            break;
        default:
            throw "Error!";
            break;
    }

    return choice;
}