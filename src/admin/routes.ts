import routeItemType from '../types/routeItemType';
import UserProfileUpdateController from './controllers/api/user/UserProfileUpdateController';
import UserProfileController from "./controllers/api/user/UserProfileController";
import UserLoginController from "./controllers/api/user/UserLoginController";
import UserLogoutController from "./controllers/api/user/UserLogoutController";
import UserRefreshTokenController from "./controllers/api/user/UserRefreshTokenController";
import UserForgotPasswordController from "./controllers/api/user/UserForgotPasswordController";
import UserResetPasswordController from "./controllers/api/user/UserResetPasswordController";
import UserListController from "./controllers/api/user/UserListController";
import UserCreateController from "./controllers/api/user/UserCreateController";
import UserUpdateController from "./controllers/api/user/UserUpdateController";
import UserDeleteController from "./controllers/api/user/UserDeleteController";
import UserItemController from "./controllers/api/user/UserItemController";
import IsAuthedMiddleware from './middlewares/IsAuthedMiddleware';
import IsAdminMiddleware from './middlewares/IsAdminMiddleware';
import RefreshTokenValidMiddleware from "./middlewares/RefreshTokenValidMiddleware";

const routes: routeItemType[] = [
    {
        url: 'user',
        name: 'user',
        children: [
            {
                url: 'profile',
                name: 'profile',
                method: 'get',
                middlewares: [new IsAuthedMiddleware],
                controller: new UserProfileController
            },
            {
                url: 'profile-update',
                name: 'profile-update',
                method: 'put',
                middlewares: [new IsAuthedMiddleware],
                controller: new UserProfileUpdateController
            },
            {
                url: 'login',
                name: 'login',
                method: 'post',
                controller: new UserLoginController
            },
            {
                url: 'logout',
                name: 'logout',
                method: 'post',
                middlewares: [new IsAuthedMiddleware],
                controller: new UserLogoutController
            },
            {
                url: 'refresh-token',
                name: 'refresh-token',
                method: 'put',
                middlewares: [new RefreshTokenValidMiddleware],
                controller: new UserRefreshTokenController
            },
            {
                url: 'forgot-password',
                name: 'forgot-password',
                method: 'post',
                controller: new UserForgotPasswordController
            },
            {
                url: 'reset-password',
                name: 'reset-password',
                method: 'post',
                controller: new UserResetPasswordController
            },
            {
                url: 'list',
                name: 'list',
                method: 'get',
                middlewares: [new IsAuthedMiddleware, new IsAdminMiddleware],
                controller: new UserListController
            },
            {
                url: 'create',
                name: 'create',
                method: 'post',
                middlewares: [new IsAuthedMiddleware, new IsAdminMiddleware],
                controller: new UserCreateController
            },
            {
                url: 'update/:id',
                name: 'update',
                method: 'put',
                middlewares: [new IsAuthedMiddleware, new IsAdminMiddleware],
                controller: new UserUpdateController
            },
            {
                url: 'delete/:id',
                name: 'delete',
                method: 'delete',
                middlewares: [new IsAuthedMiddleware, new IsAdminMiddleware],
                controller: new UserDeleteController
            },
            {
                url: 'item/:id',
                name: 'item',
                method: 'get',
                middlewares: [new IsAuthedMiddleware, new IsAdminMiddleware],
                controller: new UserItemController
            }
        ]
    }
]

export default routes;