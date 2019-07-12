const logInHandle = (state, token) => {
    localStorage.setItem('token', token);
    return {
        ...state,
        errors: {
            ...state.errors,
            loginError: false,
        },
        isLoggedIn: true,
    };
}

const logOutHandle = (state) => {
    localStorage.removeItem('token');
    return {
        ...state,
        user: {
            email: '',
            password: '',
        },
        isLoggedIn: false,
    }
}

const loginInputChangeHandle = (state, data) => {
    return {
        ...state,
        user: {
            ...state.user,
            [data.name]: data.value
        }
    }
}

const loginInputError = (state) => {
    return {
        ...state,
        errors: {
            ...state.errors,
            loginError: true,
        }
    }
}

export {
    logInHandle,
    logOutHandle,
    loginInputChangeHandle,
    loginInputError
}