import BaseMiddleware from "./BaseMiddleware.ts";
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";
import authService from '../services/Auth.ts';
import routerPlugin from '../plugins/router.ts';
import viewConfig from '../configs/view.ts';

class IsAuthedMiddleware extends BaseMiddleware
{
    async handle(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
        if (await authService.check()) {
            next();
        } else {
            routerPlugin.push({ name: viewConfig.page.login });
        }
    }
}

export default IsAuthedMiddleware;