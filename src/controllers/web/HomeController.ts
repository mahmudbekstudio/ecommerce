import Controller from "../Controller";
import { Request, Response } from "express";

class HomeController extends Controller
{
    protected title: string = 'Home page';
    handle(req: Request, res: Response) {
        res.render('home', {});
    }
}

export default HomeController;