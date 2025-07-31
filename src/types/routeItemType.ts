import Controller from "../controllers/Controller";
import Middleware from "../middlewares/Middleware";
type routeItemType = {
    url: string;
    method?: 'get'|'post'|'delete'|'put';
    name: string;
    middlewares?: Middleware[];
    controller?: Controller;
    children?: routeItemType[];
};
export default routeItemType;