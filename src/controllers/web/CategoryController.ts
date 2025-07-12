import Controller from "../Controller";
import { Request, Response } from "express";

class CategoryController extends Controller
{
    handle(req: Request, res: Response) {
        res.send('Category' + JSON.stringify(req.params));
    }
}

export default CategoryController;