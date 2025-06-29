import { createServer } from 'http';
import routes from './modules/routes.js';
import checkRouteUrl from "./foundation/utils/checkRouteUrl.js";

const PORT = process.env.PORT;

const server = createServer((req, res) => {
    for (const route of routes) {
        if (checkRouteUrl(req.url, route.pattern)) {
            if (route.middleware && route.middleware.length) {
                for (const middleware of route.middleware) {
                    middleware(req, res, () => route.controller)
                }
            }
        }
    }
    res.end();
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
