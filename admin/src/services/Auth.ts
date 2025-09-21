import tokenService from './Token.ts';
import storage from "./Storage.ts";
import http from './Http.ts';
import userApi from "../module/user/api.ts";

class Auth {
    public login(token, user) {
        tokenService.store(token);
        storage.set('user', user);
    }

    get user() {
        return storage.get('user');
    }

    get token() {
        return tokenService.token;
    }

    public logout() {
        tokenService.remove();
        storage.remove('user');
    }

    get tokenIsNotExpired(): boolean {
        const token = this.token;

        if (!token) return false;

        return (new Date()).getTime() < token.tokenExpireTime;
    }

    get refreshTokenIsNotExpired() {
        const token = this.token;

        if (!token) return false;

        return (new Date()).getTime() < token.refreshTokenExpireTime;
    }

    public async check(): boolean {
        const tokenItem = this.token;

        if (!tokenItem) {
            return false
        }

        if (!this.refreshTokenIsNotExpired) {
            this.logout();
            return false;
        }

        if (!this.tokenIsNotExpired) {
            try {
                const {data: {result, token, user}} = await http
                    .route(userApi.refreshToken)
                    .data(tokenItem.refreshToken)
                    .send();

                if (result) {
                    this.login(token, user);
                } else {
                    this.logout();
                    return false;
                }
            } catch (e) {
                this.logout();
                return false;
            }
        }

        return true;
    }
}

const auth = new Auth();

export default auth;