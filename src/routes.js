import { notFound } from "./404";
import game from "./game";
import login from "./login";
import signup from "./sign-up";

const routes = [
    {
        path: "/",
        template: game
    },
]


export default routes;