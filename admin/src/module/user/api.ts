export default {
    login: {
        url: '/admin-api/user/login',
        method: 'post',
        data(email: string, password: string) {
            return {email, password}
        }
    }
}