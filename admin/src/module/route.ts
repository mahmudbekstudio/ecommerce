import dashboardRoute from './dashboard/route.ts';
import errorRoute from './error/route.ts';
import userRoute from './user/route.ts';

export default [
    {path: '', redirect: {name: 'dashboard'/*viewConfig.page.default*/}},
    dashboardRoute,
    userRoute,
    errorRoute,
    {path: '*', redirect: {name: 'not-found'/*viewConfig.page.notFound*/}}
];