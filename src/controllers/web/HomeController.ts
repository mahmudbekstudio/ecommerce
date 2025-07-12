import Controller from "../Controller";
import { Request, Response } from "express";

class HomeController extends Controller
{
    handle(req: Request, res: Response) {
        //res.send('Home');
        res.render('home', {
            title: 'Homepage',
            heading: 'Hello from EJS!',
            user: 'Mahmudbek'
        });
    }
}

export default HomeController;