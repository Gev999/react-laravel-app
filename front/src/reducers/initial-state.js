export default {
    isLoggedIn: !!localStorage.getItem('token'),
    user: {
        email: '',
        password: '',
    },
    errors: {
        loginError: false,
    }
}