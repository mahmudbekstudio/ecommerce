export default {
    login: {
        url: '/admin-api/user/login',
        method: 'post',
        data(email: string, password: string) {
            return { email, password }
        }
    },
    refreshToken: {
        url: '/admin-api/user/refresh-token',
        method: 'put',
        data(refreshToken: string) {
            return { refreshToken }
        }
    },
}