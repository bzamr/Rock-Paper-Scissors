export default function loginPage() {
  return `
        <div class="login-layer">
        <div class="login-page">
            <button id="goHome">&#129136;</button>
            <h1>LOGIN</h1>
            <p>Welcome back! Let's take you to your account.</p>
            <form>
            <input type="email" id="email" name="email" placeholder="Email Address">
            <input type="password" id="password" name="password" placeholder="Password">
            </form>
        <button id="loginButton">continue</button>
        </div>

        </div>
    `;
}
