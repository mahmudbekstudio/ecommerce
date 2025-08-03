import UserType from "../types/UserType";
import mainConfig from "../configs/main";
import jwt from "jsonwebtoken";
import _ from 'lodash';

export default (userItem: UserType, additional: object = {}) => {
    const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';

    const accessToken = jwt.sign({
        id: userItem._id,
        email: userItem.email,
    }, jwtSecret, {expiresIn: mainConfig.token.accessTokenExpireTime});

    const refreshToken = jwt.sign({
        id: userItem._id,
    }, jwtSecret, {expiresIn: mainConfig.token.refreshTokenExpireTime});

    const tokenExpireTime = (jwt.decode(accessToken) as { exp: number }).exp * 1000;
    const refreshTokenExpireTime = (jwt.decode(refreshToken) as { exp: number }).exp * 1000;

    const user = {...userItem.data};

    for (const key in additional) {
        user[key] = _.get(userItem, additional[key]);
    }

    return {token: {accessToken, refreshToken, tokenExpireTime, refreshTokenExpireTime}, user};
}