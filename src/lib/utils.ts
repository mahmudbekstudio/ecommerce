import { Request, Response } from "express";

const isAdmin = (req: Request) => {
    return req.url.startsWith('/admin');
}

export default {
    isAdmin
}