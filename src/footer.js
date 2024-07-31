export function footer(element){
    element.innerHTML = `
    <button id="rules">
        RULES
    </button>
    <a href="https://github.com/bzamr/Rock-Paper-Scissors">
        <img src="/github-icon-light.svg" alt="repository link">
    </a>
    <div class="modal closed">
        <h2>RULES</h2>
        <img src="/rules.svg">
        <p>Press any where to exit</p>
    </div>
    `;
    const rules_btn = document.querySelector("#rules");
    const modal = document.querySelector(".modal");
    rules_btn.addEventListener("click",()=>{
        modal.classList.toggle("closed");
    });
    
    modal.addEventListener("click",(event)=>{
        if(event.target === modal){
            modal.classList.toggle("closed");
        }
    })
    
}
