import express, { Application, Request, Response, NextFunction } from 'express';
import routes, { routeItemType } from './routes';
import getApp from "./lib/getApp";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app: Application = getApp();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('./src/public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function generateRoute(routes: routeItemType[], parentUrl: string = '') {
    for (const routeItem of routes) {
        const url = [parentUrl, routeItem.url].join('/');
        if (routeItem.children) {
            generateRoute(routeItem.children, url);
        } else if (routeItem.controller && routeItem.method) {
            app[routeItem.method](url, routeItem.controller.handle);
        }
    }
}

generateRoute(routes);

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).send('Route not found');
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});