import BaseMiddleware from "./BaseMiddleware.ts";
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";
import NotFoundException from "../Exceptions/NotFoundException.ts";

class IsAuthedMiddleware extends BaseMiddleware
{
    handle(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
        console.log('IsAuthedMiddleware1');
        throw new NotFoundException('Errrroooorr');
        next();
        console.log('IsAuthedMiddleware2')
    }
}

export default IsAuthedMiddleware;