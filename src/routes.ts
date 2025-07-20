import HomeController from './controllers/web/HomeController';
import CategoryController from "./controllers/web/CategoryController";
import PostController from "./controllers/web/PostController";
import Controller from "./controllers/Controller";
import LoginController from './controllers/api/LoginController';
import LogoutController from './controllers/api/LogoutController';
import SignupController from './controllers/api/SignupController';

export type routeItemType = {
    url: string;
    method?: 'get'|'post'|'delete'|'put';
    name: string;
    controller?: Controller;
    children?: routeItemType[]
};

const routes: routeItemType[] = [
    {
        url: '',
        method: 'get',
        name: 'home',
        controller: new HomeController
    },
    {
        url: 'category/:category_name',
        name: 'category',
        children: [
            {
                url: '',
                method: 'get',
                name: 'category_item',
                controller: new CategoryController
            },
            {
                url: 'post/:post_name',
                method: 'get',
                name: 'post',
                controller: new PostController
            }
        ],
    },
    {
        url: 'api',
        name: 'api',
        children: [
            {
                url: 'login',
                name: 'login',
                method: 'post',
                controller: new LoginController
            },
            {
                url: 'logout',
                name: 'logout',
                method: 'post',
                controller: new LogoutController
            },
            {
                url: 'signup',
                name: 'signup',
                method: 'post',
                controller: new SignupController
            }
        ],
    }
];

export default routes;