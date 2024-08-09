import { sync_score } from "./sync_score";


let logout = false;
export function footer(element){
    element.innerHTML = `
    <button id="rules" title="Show Game Guide">
        RULES
    </button>
    <a href="https://github.com/bzamr/Rock-Paper-Scissors" title="Github Repository">
        <img src="/github-icon-light.svg" alt="repository link">
    </a>
    ${button_gen()}
    <div class="modal closed">
        <h2>RULES</h2>
        <img src="/rules.svg">
        <p>Press any where to exit</p>
    </div>
    `;
    const rules_btn = document.querySelector("#rules");
    const modal = document.querySelector(".modal");

    if(!logout){
        const login_btn = document.querySelector(".login");
        const signup_btn = document.querySelector(".signup");
        login_btn.addEventListener("click",()=>{
            window.router('/login');
        });
    
        signup_btn.addEventListener("click",()=>{
            window.router('/signup');
        });

    }else{

        const logout_btn = document.querySelector(".logout");
        
        logout_btn.addEventListener("click", ()=>{
            sync_score("set");
            fetch("/api/v1/logout",{
                method: "get",
            }).then((res)=>{
                res.json().then((js)=>{
                    switch (res.status) {
                        case 401:
                            show_toast_message(js.error,"error");
                            break;
                        case 200:
                            show_toast_message(js.message,"success");
                            logedin();
                            break;
                        case 404:
                            show_toast_message("Check your Connection","error");
                            break;
                        case 500:
                            show_toast_message(js.error,"error");
                            break;
                        default:
                            show_toast_message("Unkown Error!","error");
                            break;

                    }
                });
            });
        });
        
    }



    rules_btn.addEventListener("click",()=>{
        modal.classList.toggle("closed");
    });
    
    modal.addEventListener("click",(event)=>{
        if(event.target === modal){
            modal.classList.toggle("closed");
        }
    })


}


export function logedin(){
    logout = !logout;
    setTimeout(()=>{
        window.router('/');
        footer(document.querySelector(".footer"));

    },2500);
}

function button_gen(){
    if (!logout){
        return `<button class="login" title="Login"><img src="/login.svg" alt="login"></button>
                <button class="signup" title="Sign Up"><img src="/signup.svg" alt="sign up" ></button>`;
    }else{
        return '<button class="logout" title="Logout"><img src="/login.svg" alt="logout"></button>';
    }
}

export function show_toast_message(message,type){
    const toast = document.createElement("span");
    toast.classList.add("toast");
    toast.classList.add(type);
    toast.innerText = message;

    document.querySelector(".footer").appendChild(toast);
    toast.classList.add("fade");
    setTimeout(()=>{       
        toast.remove();
    },2500)
    
}