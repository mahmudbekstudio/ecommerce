import BaseMiddleware from "./BaseMiddleware.ts";
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

class IsNotAuthedMiddleware extends BaseMiddleware
{
    handle(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
        console.log('IsNotAuthedMiddleware1');
        next();
        console.log('IsNotAuthedMiddleware2')
    }
}

export default IsNotAuthedMiddleware;