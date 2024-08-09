import '../styles/login-form.scss'
import { logedin } from './footer';
import { validate_email, validate_password } from './sign-up';
import { show_toast_message } from './sign-up';
import { sync_score } from './sync_score';

export default function login(){
    document.querySelector("#app").innerHTML = `
        <div class="login-page">
            <button class="back-btn" onclick=window.router("/")><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button>
            <h1>LOGIN</h1>
            <p>Welcome back! Let's take you to your account.</p>
            <form>
            <input type="email" id="email" name="email" placeholder="Email Address">
            <input type="password" id="password" name="password" placeholder="Password">
            </form>
        <button id="submit-btn">continue</button>
        </div>
    `;

    const email = document.getElementById("email");
    const password = document.querySelector("#password");
    let form = new FormData();
    const disable_input = (en)=>{
        password.disabled = en;
        email.disabled = en;
    }

    document.querySelector("#submit-btn").addEventListener("click",()=>{
    
        
        if (!validate_email(email.value)){
            
            show_toast_message("Please Provide A Valid Email Address","error");
            
        }else if(!validate_password(password.value)){
            
            show_toast_message("Password Must be 6-14 Characters and Contain Alphabet Characters","error");
            
        }else{
            disable_input(true);
            form.append("email",String(email.value).trim());
            form.append("password",String(password.value).trim());
            send_login_request(form);
            disable_input(false);
            form = new FormData();
        }   
    });
}


export function send_login_request(form){
    fetch("/api/v1/login",{
        body: form,
        method: "POST",
    })
    .then((resp)=>{
        
        resp.json().then((js)=>{
            switch (resp.status){
                case 200:
                    show_toast_message(js.message,"success");
                    sync_score("get");
                    logedin(false);
                    break;
                case 401:
                    show_toast_message(js.error,"error");
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

        })
    });


}