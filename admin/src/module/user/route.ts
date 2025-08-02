import List from "./list/List.vue";
import Login from "./login/Login.vue";
import ForgotPassword from "./forgot-password/ForgotPassword.vue";
import ResetPassword from "./reset-password/ResetPassword.vue";
import IsAuthedMiddleware from "../../middlewares/IsAuthedMiddleware.ts";
import UserRoleMiddleware from "../../middlewares/UserRoleMiddleware.ts";
import IsNotAuthedMiddleware from '../../middlewares/IsNotAuthedMiddleware.ts';
export default {
    path: 'user',
    name: 'user',
    children: [
        {
            path: 'login',
            name: 'login',
            component: Login,
            meta: {
                layout: 'CenteredLayout',
                middlewares: [new IsAuthedMiddleware, new UserRoleMiddleware('admin'), new IsNotAuthedMiddleware],
            }
        },
        {
            path: 'forgot-password',
            name: 'forgotPassword',
            component: ForgotPassword,
        },
        {
            path: 'reset-pawword',
            name: 'reset-pawword',
            component: ResetPassword,
        },
        {
            path: 'list',
            name: 'list',
            component: List,
        },
    ]
};