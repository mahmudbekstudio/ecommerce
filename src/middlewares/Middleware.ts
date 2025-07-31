import {Request, Response, NextFunction} from "express";

class Middleware
{
    public handle (req: Request, res: Response, next: NextFunction) {
        throw Error("Not declared");
    }
}

export default Middleware