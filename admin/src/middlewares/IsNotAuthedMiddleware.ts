import BaseMiddleware from "./BaseMiddleware.ts";
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";
import tokenService from '../services/Token.ts';
import routerPlugin from '../plugins/router.ts';
import viewConfig from '../configs/view.ts';

class IsNotAuthedMiddleware extends BaseMiddleware
{
    handle(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
        if (!tokenService.token) {
            next();
        } else {
            routerPlugin.push({ name: viewConfig.page.default });
        }
    }
}

export default IsNotAuthedMiddleware;