import { Request, Response, Application } from 'express';
import getApp from "../lib/getApp";
import { z } from 'zod';

class Controller {
    protected app: Application;
    public title: string = '';
    public request: z.ZodObject|null = null;


    constructor() {
        this.app = getApp();
    }

    public init () {
        this.setTitle(this.title);
    }

    public beforeHandle (req: Request, res: Response, data: any = null) {
        //
    }

    public handle (req: Request, res: Response, data: any = null) {
        throw Error("Not declared");
    }

    public afterHandle (req: Request, res: Response, data: any = null) {
        //
    }

    protected setTitle (title: string) {
        this.app.locals.siteTitle = title;
    }
}

export default Controller;