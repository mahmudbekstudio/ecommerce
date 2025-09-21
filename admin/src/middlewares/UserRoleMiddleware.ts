import BaseMiddleware from "./BaseMiddleware.ts";
import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";
import authService from '../services/Auth.ts';
import routerPlugin from "../plugins/router.ts";
import viewConfig from "../configs/view.ts";

class UserRoleMiddleware extends BaseMiddleware
{
    private roles: string[];
    constructor(roles: string[]) {
        super();
        this.roles = roles;
    }
    handle(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
        if (this.roles.indexOf(authService.user.role) > -1) {
            next();
        } else {
            routerPlugin.push({ name: viewConfig.page.notFound });
        }
    }
}

export default UserRoleMiddleware;