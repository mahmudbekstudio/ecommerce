import BaseMiddleware from "./BaseMiddleware.ts";
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

class UserRoleMiddleware extends BaseMiddleware
{
    private role: string;
    constructor(role) {
        super();
        this.role = role;
    }
    handle(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
        console.log('UserRoleMiddleware 1 ' + this.role);
        next();
        console.log('UserRoleMiddleware 2 ' + this.role);
    }
}

export default UserRoleMiddleware;