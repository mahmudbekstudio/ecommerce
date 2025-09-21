import Main from "./main/Main.vue";
import IsAuthedMiddleware from "../../middlewares/IsAuthedMiddleware.ts";

export default {
    path: 'dashboard',
    name: 'dashboard',
    children: [
        {
            path: 'main',
            name: 'main',
            component: Main,
            meta: {
                middlewares: [new IsAuthedMiddleware]
            }
        }
    ]
};