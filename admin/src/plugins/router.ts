import {
    useRouter,
    createRouter,
    createWebHistory,
} from 'vue-router';
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";
import routes from '../module/route';
import initRoutes from "../libraries/initRoutes.ts";
import callMiddlewares from "../libraries/callMiddlewares.ts";
import app from '../services/App.ts';
import viewConfig from '../configs/view.ts';
import NotFoundException from '../Exceptions/NotFoundException.ts';

const router = createRouter({
    history: createWebHistory('/admin/'),
    routes: initRoutes(routes),
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
    app.layout = to?.meta?.layout || viewConfig.layout;

    try {
        Array.isArray(to.meta.middlewares) &&
        callMiddlewares(to.meta.middlewares, () => false, to, from, next)();

        next();
    } catch (e) {
        console.error(e);

        if (e instanceof NotFoundException) {
            next(useRouter().resolve({name: 'error.not-found'}));
        }
    }
});

export default router