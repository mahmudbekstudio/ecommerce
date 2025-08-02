//import dashboardRoute from './dashboard/route.ts';
import errorRoute from './error/route.ts';
import userRoute from './user/route.ts';
import Dashboard from "./dashboard/Dashboard.vue";
import parent from '../views/parent.vue';

export default [
    /*{
        path: 'admin',
        name: 'admin',
        component: parent,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard,
            }
        ]
    }*/
    //{path: '', redirect: {name: 'dashboard'/*viewConfig.page.default*/}},
    //dashboardRoute,
    {
        path: '',
        name: 'dashboard',
        component: Dashboard,
    },
    userRoute,
    errorRoute,
    //{path: '*', redirect: {name: 'not-found'/*viewConfig.page.notFound*/}}
];