import type {NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded} from "vue-router";

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

export default callMiddlewares;