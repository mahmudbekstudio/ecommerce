import HomeController from './controllers/web/HomeController';
import BlogController from "./controllers/web/BlogController";
import BlogPostController from "./controllers/web/BlogPostController";
import BlogTagController from './controllers/web/BlogTagController';
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
        url: 'blog{/:blog_name}',
        name: 'blog',
        method: 'get',
        controller: new BlogController
    },
    {
        url: 'blog-tag/:tag_name',
        name: 'blog_tag',
        method: 'get',
        controller: new BlogTagController
    },
    {
        url: 'blog-post/:post_name',
        method: 'get',
        name: 'blog_post',
        controller: new BlogPostController
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