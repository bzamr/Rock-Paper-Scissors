import "../../styles/404.scss";

export default function notFoundPage() {
  return `
        <div class="container">
        <h1>Oops!</h1>
        <img src="/sad-robot.avif" width300 height=300>
        <p><strong>We couldn't find the page you were looking for</strong></p>
        <button id="goHome">Go Back</button>  
        </div> 
    `;
}
