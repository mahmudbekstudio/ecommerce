import Controller from "../Controller";
import { Request, Response } from "express";

class CategoryController extends Controller
{
    handle(req: Request, res: Response) {
        res.render('caegory', {});
    }
}

export default CategoryController;