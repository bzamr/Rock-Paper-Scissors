import routes from "./routes";

const router = path => {
    window.history.pushState({},'',path);

    routes.forEach(route =>{
        if(route.path === path) route.template();
    })
}

export default router;