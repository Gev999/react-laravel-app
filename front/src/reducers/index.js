import initialState from './initial-state';
import userHandle from './user';
import companiesHandle from './companies';

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOG_IN':
        case 'LOG_OUT':
        case 'USER_INPUT_DATA':
        case 'USER_INPUT_DATA_ERROR':
            return userHandle(state, action);

        case 'FETCH_COMPANIES_REQUEST':
        case 'FETCH_COMPANY_REQUEST':
        case 'FETCH_COMPANY_FAILED':
        case 'RESET_COMPANY':
        case 'COMPANY_DATA_CHANGE':
        case 'FAILED_COMPANY_REQUEST':
        case 'COMPANY_LOGO_FILE':
        case 'COMPANY_LOGO':
            return companiesHandle(state, action);

        default:
            return state;
    }
}

export default reducer;