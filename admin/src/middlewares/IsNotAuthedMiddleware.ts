import BaseMiddleware from "./BaseMiddleware.ts";
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

class IsNotAuthedMiddleware extends BaseMiddleware
{
    handle(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {

        next();
    }
}

export default IsNotAuthedMiddleware;