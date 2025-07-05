export const compose = (middlewares, req, res, route) => {
    const list = [...middlewares];
    function dispatch(list) {
        if (!list.length) {
            return Promise.resolve(route.controller(req, res, ...req.url.match(route.pattern).slice(1)));
        }
        return Promise.resolve(list[0](req, res, () => dispatch(list.slice(1))));
    }

    return dispatch(list);
}

/*export const compose = middlewares => ((req, res, controller) => {
    let index = -1;
    function dispatch(i) {
        if (i <= index) return Promise.reject(new Error("next() called multiple times"));
        index = i;
        let fn = i === middlewares.length ? controller : middlewares[i];
        if (!fn) return Promise.resolve();
        return Promise.resolve(fn(req, res, () => dispatch(i + 1)));
    }
    return dispatch(0);
});*/

export const checkRouteUrl = (url, pattern) => {
    return pattern.test(url);
};