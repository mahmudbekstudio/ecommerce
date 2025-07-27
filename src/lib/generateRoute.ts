import { routeItemType } from "../routes";
import {Application, Request, Response, NextFunction} from "express";
import getApp from "./getApp";
import { z } from 'zod';
import Controller from "../controllers/Controller";
import ApiController from "../controllers/ApiController";
import requestError from "./requestError";
import viewParams from '../viewParams';
import lodash from 'lodash';

export default function generateRoute(routes: routeItemType[]) {
    const app:Application = getApp();

    const generateRouteList = function (routes: routeItemType[], parentUrl: string = '') {
        for (const routeItem of routes) {
            const url = [parentUrl, routeItem.url].join('/');
            if (routeItem.children) {
                generateRouteList(routeItem.children, url);
            } else if (routeItem.controller && routeItem.method) {
                const controller: Controller = routeItem.controller;
                app[routeItem.method](url, async (req: Request, res: Response) => {
                        try {
                            if (controller.request) {
                                await controller.request.parseAsync(req.body)
                            }

                            controller.init();
                            controller.beforeHandle(req, res, req.body);
                            const result = await controller.handle(req, res, req.body);

                            if (result === false) return false;

                            if (controller instanceof ApiController) {
                                res.json(result);
                            } else {
                                if (viewParams.views[controller.view]) {
                                    const paramKeys = viewParams.views[controller.view]();

                                    if (Array.isArray(paramKeys) && paramKeys.length) {
                                        for (let i = 0; i < paramKeys.length; i++) {
                                            const params = lodash.get(viewParams, paramKeys[i]);

                                            for (const paramsKey in params) {
                                                const resultKey = 'viewParams.' + paramKeys[i] + '.' + paramsKey;

                                                if (!lodash.has(result, resultKey)) {
                                                    lodash.set(result, resultKey, await params[paramsKey]());
                                                }
                                            }
                                        }
                                    }
                                }
                                res.render(controller.view, result);
                            }

                            controller.afterHandle(req, res, req.body);
                        } catch (e) {
                            if (e instanceof z.ZodError) {
                                res.statusCode = 400;
                                res.json({error: 'Error', data: requestError(e)});
                            } else {
                                console.error("Unexpected error:", e);

                                if (controller instanceof ApiController) {
                                    res.json({error: 'Error'});
                                } else {
                                    res.send('error');
                                }
                            }
                        }
                    });
            }
        }
    }

    generateRouteList(routes);

    // 404 handler
    app.use((req: Request, res: Response) => {
        /*console.log('not found url', req.url);
        res.status(404).send('Route not found');*/
        res.redirect(404, '/404');
    });

    // Global error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('Error:', err.message);
        res.status(500).send('Internal Server Error');
    });
}