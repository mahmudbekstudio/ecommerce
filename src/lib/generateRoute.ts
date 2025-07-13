import { routeItemType } from "../routes";
import {Application, Request, Response, NextFunction} from "express";
import getApp from "./getApp";

export default function generateRoute(routes: routeItemType[], parentUrl: string = '') {
    const app:Application = getApp();

    for (const routeItem of routes) {
        const url = [parentUrl, routeItem.url].join('/');
        if (routeItem.children) {
            generateRoute(routeItem.children, url);
        } else if (routeItem.controller && routeItem.method) {
            const controller = routeItem.controller;
            app[routeItem.method](url, (req: Request, res: Response) => {
                controller.beforeHandle(req, res);
                controller.handle(req, res);
                controller.afterHandle(req, res);
            });
        }
    }

    // 404 handler
    app.use((req: Request, res: Response) => {
        res.status(404).send('Route not found');
    });

    // Global error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('Error:', err.message);
        res.status(500).send('Internal Server Error');
    });
}