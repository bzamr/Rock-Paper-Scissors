import { userToken } from "../lib/formHandler";

export function navigationBar() {
  const log =
    userToken.LogedIn === true
      ? `<li>
                <button id="logoutButton">
                    Logout
                </button>
            </li>
            <li>`
      : `<li>
                <button id="loginButtonNav">
                    Login
                </button>
            </li>
            <li>
                <button id="signupButtonNav">
                    Sign up
                </button>
            </li>`;

  return `
        <ul>
            <li>
                <button id="rules" title="Show Game Guide">
                    Rules
                </button>
            </li>
            ${log}
            <li>
                <button id="gameModeChanger">
                    Change Game Mode
                </button>
            </li>

        </ul>
        `;
}
