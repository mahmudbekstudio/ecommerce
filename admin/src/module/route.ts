import dashboardRoute from './dashboard/route.ts';
import errorRoute from './error/route.ts';
import userRoute from './user/route.ts';
import viewConfig from '../configs/view.ts';

export default [
    {
        path: '/',
        children: [
            {path: '', redirect: {name: viewConfig.page.default}},
            dashboardRoute,
            userRoute,
            errorRoute,
            {path: ':pathMatch(.*)*', redirect: {name: viewConfig.page.notFound}}
        ]
    },
];