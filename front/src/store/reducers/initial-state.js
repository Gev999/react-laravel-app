export default {
    isLoggedIn: !!localStorage.getItem('token'),
    user: {
        email: '',
        password: '',
    },

    errors: {
        loginError: false,
        company: {},
        employee: {}
    },

    companies: [],
    company: {},

    employees: [],
    employee: {},
}