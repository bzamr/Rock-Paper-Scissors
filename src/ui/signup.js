export default function signUpPage() {
  return `
        <div class="signup-page">
            <button id="goHome">&#129136;</button>
            <h1>SIGN UP</h1>
            <p>Welcome back! Let's take you to your account.</p>
            <form>
            <input type="text" id="fullname" name="fullname" placeholder="Full Name">
            <input type="email" id="email" name="email" placeholder="Email Address">
            <input type="password" id="password" name="password" placeholder="Password">
            </form>
        <button id="signUpButton">continue</button>
        </div>
    `;
}
