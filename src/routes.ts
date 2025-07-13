import HomeController from './controllers/web/HomeController';
import CategoryController from "./controllers/web/CategoryController";
import PostController from "./controllers/web/PostController";
import Controller from "./controllers/Controller";

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
                url: ':post_name',
                method: 'get',
                name: 'post',
                controller: new PostController
            }
        ],
    }
];

export default routes;