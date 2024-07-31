import { choice_menu, random_choice } from "./machine-ai";
import update_ui from "./update-ui";




export function referee(user_choice){
    const opposite_choice = random_choice();
    const result = {
        user : user_choice,
        opposite : opposite_choice,
        winner : winner(user_choice,opposite_choice),
    }

    update_ui({
        "result" : result,
        "board_type" : "result",
    });
}

function winner(user_choice,machine_choice){
    let options = choice_menu();

    if (user_choice == machine_choice){
        return null;
    }
    else if (user_choice === options.rock && machine_choice === options.scissors ){
        return "user";
    }else if (user_choice === options.paper  && machine_choice === options.rock ){
        return "user";
    }else if (user_choice === options.scissors && machine_choice === options.paper ){
        return "user";
    }else {
        return "opposite";
    }
}