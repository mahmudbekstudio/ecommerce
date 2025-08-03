export default {
    password: {
        minLength: 6,
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/,
        regexMessage: 'Password must include uppercase, lowercase, number, and symbol',
    },
    token: {
        accessTokenExpireTime: '1h',
        refreshTokenExpireTime: '30d',
    },
    pagination: {
        count: 10,
    }
}