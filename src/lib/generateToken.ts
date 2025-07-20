import UserType from "../types/UserType";
import mainConfig from "../configs/main";
import jwt from "jsonwebtoken";

export default (userItem: UserType) => {
    const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';

    const token = jwt.sign({
        id: userItem._id,
        email: userItem.email,
    }, jwtSecret, {expiresIn: mainConfig.token.tokenExpireTime});

    const refreshToken = jwt.sign({
        id: userItem._id,
    }, jwtSecret, {expiresIn: mainConfig.token.refreshTokenExpireTime});

    const tokenExpireTime = (jwt.decode(token) as { exp: number }).exp * 1000;
    const refreshTokenExpireTime = (jwt.decode(refreshToken) as { exp: number }).exp * 1000;

    return {token, refreshToken, tokenExpireTime, refreshTokenExpireTime, data: userItem.data};
}