export function goHomeButton() {
  document.querySelector("#goHome")?.addEventListener("click", () => {
    window.router("/");
  });
}
