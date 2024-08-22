import { mainPage } from "../ui/main";
import notFoundPage from "../ui/404";
import loginPage from "../ui/login";
import signUpPage from "../ui/signup";
import {
  boardClassAndListener,
  goHomeButton,
  loginButton,
  menuButton,
  navigationButtons,
  signupButton,
  themeChangerButton,
} from "./eventListners";

const routes = [
  {
    path: "/",
    template: mainPage,
    attachments: [
      navigationButtons,
      menuButton,
      themeChangerButton,
      boardClassAndListener,
    ],
  },
  {
    path: "/login",
    template: loginPage,
    attachments: [loginButton, goHomeButton],
  },
  {
    path: "/signup",
    template: signUpPage,
    attachments: [signupButton, goHomeButton],
  },
  {
    path: "/404",
    template: notFoundPage,
    attachments: [goHomeButton],
  },
];

export default routes;
