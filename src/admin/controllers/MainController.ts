import Controller from '../../controllers/Controller';
import e from "express";

class MainController extends Controller
{
    view = 'admin/main';
    handle(req: e.Request, res: e.Response, data: any = null) {
        return {}
    }
}

export default MainController;