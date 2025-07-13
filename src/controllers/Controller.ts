import { Request, Response, Application } from 'express';
import getApp from "../lib/getApp";

class Controller {
    protected app: Application;
    protected title: string = '';

    constructor() {
        this.app = getApp();
        this.init();
    }

    protected init () {
        this.setTitle(this.title);
    }

    public beforeHandle (req: Request, res: Response) {
        //
    }

    public handle (req: Request, res: Response) {
        throw Error("Not declared");
    }

    public afterHandle (req: Request, res: Response) {
        //
    }

    protected setTitle (title: string) {
        this.app.locals.siteTitle = title;
    }
}

export default Controller;