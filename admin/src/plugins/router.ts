import {
    useRouter,
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteLocationNormalizedLoaded
} from 'vue-router';
import routes from '../module/route';
import initRoutes from "../libraries/initRoutes.ts";
import app from '../libraries/App.ts';
import viewConfig from '../configs/view.ts';
import NotFoundException from '../Exceptions/NotFoundException.ts';

const router = createRouter({
    history: createWebHistory('/admin/'),
    routes: initRoutes(routes),
});
const callMiddlewares = (list: Array, callback, to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
    if (list.length) {
        const middleware = list.pop();
        return callMiddlewares(
            list,
            (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => middleware.handle(to, from, () => callback(to, from, next)),
            to,
            from,
            next
        );
    }

    return callback;
}
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
    try {
        if (Array.isArray(to.meta.middlewares)) {
            callMiddlewares(
                to.meta.middlewares,
                () => false,
                to,
                from,
                next
            )();
        }
        app.layout = to?.meta?.layout || viewConfig.layout;

        next();
    } catch (e) {
        if (e instanceof NotFoundException) {
            next(useRouter().resolve({name: 'error.not-found'}).href);
        }
        console.error('error', e);
    }
});

export default router