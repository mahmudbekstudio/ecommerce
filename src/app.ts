import express, { Application } from 'express';
import routes from './routes';
import getApp from "./lib/getApp";
import connectToDatabase from "./lib/connectToDatabase";
import generateRoute from "./lib/generateRoute";
import dotenv from 'dotenv';
import path from 'path';
import Setting from './models/Setting';
import mongoose from "mongoose";

dotenv.config();

const app: Application = getApp();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
    const settings: {key: String; value: mongoose.Schema.Types.Mixed }[] = await Setting.find();

    for (const setting of settings) {
        res.locals[setting.key] = setting.value;
    }

    next();
});

app.use('/public', express.static('./src/public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

connectToDatabase();
generateRoute(routes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});