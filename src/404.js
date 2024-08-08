import "../styles/404.scss"

export function notFound(){
    document.querySelector("#app").innerHTML = `
        <div class="container">
        <h1>Oops!</h1>
        <img src="/sad-robot.avif" width300 height=300>
        <p><strong>We couldn't find the page you were looking for</strong></p>
        <button onclick=window.router('/')>Go Back</button>  
        </div> 
    `;
}