import Controller from "../controllers/Controller";
type routeItemType = {
    url: string;
    method?: 'get'|'post'|'delete'|'put';
    name: string;
    controller?: Controller;
    children?: routeItemType[]
};
export default routeItemType;