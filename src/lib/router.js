import routes from "./routes";

const router = (path) => {
  window.history.pushState({}, "", path);

  routes.forEach((route) => {
    if (route.path === path) {
      document.querySelector("#app").innerHTML = route.template();
      route.attachments.forEach((attachment) => {
        attachment();
      });
    }
  });
};

export default router;
