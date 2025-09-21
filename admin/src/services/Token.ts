import storage from './Storage.ts';

type TokenType = {
    accessToken: string,
    refreshToken: string,
    refreshTokenExpireTime: number,
    tokenExpireTime: number
};

class Token {
    store(token: TokenType) {
        storage.set('token', token);
    }

    get token(): TokenType | null {
        return storage.get('token');
    }

    remove() {
        storage.remove('token');
    }

    get accessToken(): string | undefined {
        return this.token?.accessToken;
    }

    get refreshToken(): string | undefined {
        return this.token?.refreshToken;
    }

    get refreshTokenExpireTime(): number | undefined {
        return this.token?.refreshTokenExpireTime;
    }

    get tokenExpireTime(): number | undefined {
        return this.token?.tokenExpireTime;
    }
}

const token = new Token()

export default token