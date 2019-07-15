import{
    LOG_IN,
    LOG_OUT,
    USER_INPUT_DATA,
    USER_INPUT_DATA_ERROR,
} from 'store/actions'

const userHandle = (state, action) => {
    switch (action.type) {

        case LOG_IN:
            localStorage.setItem('token', action.token);
            return {
                ...state,
                errors: {
                    ...state.errors,
                    loginError: false,
                },
                isLoggedIn: true,
            };

        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: {
                    email: '',
                    password: '',
                },
                isLoggedIn: false,
            }

        case USER_INPUT_DATA:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.name]: action.payload.value
                }
            }

        case USER_INPUT_DATA_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    loginError: true,
                }
            }

        default: return state;
    }
}

export default userHandle;