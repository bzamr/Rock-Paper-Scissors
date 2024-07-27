export function selector(element){
  element.innerHTML = `
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
}