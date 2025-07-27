import Controller from "../Controller";
import { Request, Response } from "express";

class HomeController extends Controller
{
    public title: string = 'Home page';
    public view = 'home';
    handle(req: Request, res: Response) {
        return {};
    }
}

export default HomeController;