import { createServer } from 'http';
import routes from './modules/routes.js';
import { compose, checkRouteUrl } from './library/helper.js';

const PORT = process.env.PORT;

const server = createServer((req, res) => {
    let pageExist = false;

    for (const route of routes) {
        if (checkRouteUrl(req.url, route.pattern)) {
            compose(
                route.middleware || [],
                req,
                res,
                route
            ).catch(console.error);
            pageExist = true;
        }
    }

    if (!pageExist) {
        console.log('page not found')
    }

    res.end();
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
