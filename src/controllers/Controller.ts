import { Request, Response, Application } from 'express';
import getApp from "../lib/getApp";

class Controller {
    protected app: Application;

    constructor() {
        this.app = getApp();
        this.init();
    }

    protected init () {
        this.app.locals.siteName = 'My new website';
    }

    public handle (req: Request, res: Response) {
        throw Error("Not declared");
    }
}

export default Controller;