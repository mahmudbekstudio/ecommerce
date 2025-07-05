import homePage from './home/index.js';
import pagePage from './page/index.js';
import pageItemPage from './page/pageItem.js';

import logMiddleware from '../foundation/middleware/log.js';
import translationMiddleware from '../foundation/middleware/translation.js';

export default [
    {
        pattern: /^\/$/,
        controller: homePage,
    },
    {
        pattern: /^\/pages$/,
        controller: pagePage,
        middleware: [logMiddleware, translationMiddleware],
    },
    {
        pattern: /^\/page\/(\d+)\/test\/(\d+)$/,
        controller: pageItemPage,
        middleware: [logMiddleware, translationMiddleware],
    },
];