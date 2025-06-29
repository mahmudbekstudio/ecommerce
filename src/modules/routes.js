import homePage from './home';
import pagePage from './page';

import logMiddleware from '../foundation/middleware/log.js';
import translationMiddleware from '../foundation/middleware/translation.js';

export default [
    {
        pattern: '',
        controller: homePage,
    },
    {
        pattern: 'page',
        controller: pagePage,
        middleware: [logMiddleware, translationMiddleware],
    },
];