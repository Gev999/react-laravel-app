import * as user from './handles/user';
import initialState from './initial-state';


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOG_IN':
            return user.logInHandle(state, action.token);

        case 'LOG_OUT':
            return user.logOutHandle(state);

        case 'USER_INPUT_DATA':
            return user.loginInputChangeHandle(state, action.payload);

        case 'USER_INPUT_DATA_ERROR':
            return user.loginInputError(state);

        default:
            return state;
    }
}


export default reducer;