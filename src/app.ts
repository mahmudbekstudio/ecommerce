import express, { Application } from 'express';
import routes from './routes';
import getApp from "./lib/getApp";
import connectToDatabase from "./lib/connectToDatabase";
import generateRoute from "./lib/generateRoute";
import dotenv from 'dotenv';
import path from 'path';
import Setting from './models/Setting';
import mongoose from "mongoose";
import mainSettings from "./configs/mainSettings";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';
import generateToken from "./lib/generateToken";
import User from "./models/User";
import urils from './lib/utils';

dotenv.config();

const app: Application = getApp();


// Middleware
app.use('/public', express.static('./src/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async (req, res, next) => {
    if (urils.isAdmin(req)) {
        next();
        return false;
    }

    let token = req.cookies['accessToken'];
    let refreshToken = req.cookies['refreshToken'];
    const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
    let userItem;
    res.locals.isAuthenticated = false;
    res.locals.user = null;

    if (token || refreshToken) {
        if (!token) {
            try {
                const userToken = jwt.verify(refreshToken, jwtSecret);
                userItem = await User.findById(userToken.id);

                const generatedToken = generateToken(userItem);
                res.cookie('refreshToken', generatedToken.token.refreshToken, {
                    httpOnly: true,
                    //secure: true,
                    sameSite: 'strict',
                    maxAge: generatedToken.token.refreshTokenExpireTime
                });
                res.cookie('accessToken', generatedToken.token.accessToken, {
                    httpOnly: true,
                    //secure: true,
                    sameSite: 'strict',
                    maxAge: generatedToken.token.tokenExpireTime
                });
            } catch (e) {
                console.warn('Invalid token or user not found');
            }
        } else {
            try {
                const userToken = jwt.verify(token, jwtSecret);
                userItem = await User.findById(userToken.id);
            } catch (e) {
                console.warn('Invalid token or user not found');
            }
        }

        if (userItem) {
            res.locals.isAuthenticated = true;
            const {password, ...userData} = userItem.toObject();
            res.locals.user = userData;
        }
    }

    next();
})
app.use(async (req, res, next) => {
    if (urils.isAdmin(req)) {
        next();
        return false;
    }

    const settings: {key: String; value: mongoose.Schema.Types.Mixed }[] = await Setting.find();

    const mainSettingKeys: string[] = Object.keys(mainSettings);
    for (const mainSettingKey in mainSettings) {
        res.locals[mainSettingKey] = mainSettings[mainSettingKey];
    }

    for (const setting of settings) {
        if (mainSettingKeys.indexOf(setting.key) > -1) {
            res.locals[setting.key] = setting.value;
        }
    }

    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

connectToDatabase();
generateRoute(routes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});