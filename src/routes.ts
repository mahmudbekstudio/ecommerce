import HomeController from './controllers/web/HomeController';
import CategoryController from "./controllers/web/CategoryController";
import PostController from "./controllers/web/PostController";
import Controller from "./controllers/Controller";

export type routeItemType = {
    url: string;
    method?: 'get'|'post'|'delete'|'put';
    controller?: Controller;
    children?: routeItemType[]
};

const routes: routeItemType[] = [
    {
        url: '',
        method: 'get',
        controller: new HomeController
    },
    {
        url: 'category/:category_name',
        children: [
            {
                url: '',
                method: 'get',
                controller: new CategoryController
            },
            {
                url: ':post_name',
                method: 'get',
                controller: new PostController
            }
        ],
    }
];

export default routes;