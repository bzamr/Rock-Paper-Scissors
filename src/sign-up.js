import { send_login_request } from "./login";

export default function signup(){
    document.querySelector("#app").innerHTML = `
        <div class="login-page">
            <button class="back-btn" onclick=window.router("/")><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button>
            <h1>SIGN UP</h1>
            <p>Welcome back! Let's take you to your account.</p>
            <form>
            <input type="text" id="fullname" name="fullname" placeholder="Full Name">
            <input type="email" id="email" name="email" placeholder="Email Address">
            <input type="password" id="password" name="password" placeholder="Password">
            </form>
        <button id="submit-btn">continue</button>
        </div>
    `;

    const email = document.getElementById("email");
    const password = document.querySelector("#password");
    const name = document.querySelector("#fullname");
    let form = new FormData();
    const disable_input = (en)=>{
        name.disabled = en;
        password.disabled = en;
        email.disabled = en;
    } 
    
    document.querySelector("#submit-btn").addEventListener("click",()=>{
        if (!validate_email(email.value)){

            show_toast_message("Please Provide A Valid Email Address","error");

        }else if(!validate_password(password.value)){

            show_toast_message("Password Must be 6-14 Characters and Contain Alphabet Characters","error");

        }else if (name.value.length<4){

            show_toast_message("Invalid Name!","error");

        }else{
            disable_input(true);
            form.append("email",String(email.value).trim());
            form.append("password",String(password.value).trim());
            form.append("fullname",String(name).trim());
            form.append("score",JSON.stringify({"score":localStorage.getItem("score"),"modified_at":Date.now()}));
            form.append("preferences",JSON.stringify({"theme":"light","game_type":"3"}));
    
            fetch("/api/v1/signup",{
                method: "POST",
                body: form,
            }).then((res)=>{
                const code = res.status;
                try{
                    res.json().then((res_body)=>{

                        switch (code) {
                            case 201:
                                show_toast_message(res_body.message,"success");
                                const login_form = new FormData();
                                login_form.append("email",String(email.value).trim());
                                login_form.append("password",String(password.value).trim());
                                send_login_request(login_form);
                                break;
                            case 404:
                                show_toast_message("Check your Connection","error");
                                disable_input(false);  
                                break;
                            case 400:
                                show_toast_message(res_body.message,"error");
                                disable_input(false);  
                                break;
                            case 500:
                                show_toast_message(res_body.message,"error"); 
                                disable_input(false);   
                                break;
                            default:
                                show_toast_message("Unkown Error!");
                                disable_input(false);
                                break;
                        }
                        
                    });
                    

                }catch(err){
                    console.log(err);
                }
            });
        }
        form = new FormData();
    });
}


export function show_toast_message(message,type){
    const toast = document.createElement("span");
    toast.classList.add("toast");
    toast.classList.add(type);
    toast.innerText = message;

    document.querySelector(".login-page").appendChild(toast);
    toast.classList.add("fade");
    setTimeout(()=>{       
        toast.remove();
    },2500)
    
}

export const validate_email = (_email) => {
    const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return String(_email)
      .toLowerCase()
      .match(
        reg
      );
  };

export const validate_password = (_password) => {
    const reg = new RegExp(/^[A-Za-z]\w{6,14}$/);
    return String(_password)
      .toLowerCase()
      .match(
        reg
      );
  };


