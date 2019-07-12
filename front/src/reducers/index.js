import initialState from './initial-state';
import userHandle from './user';
import companiesHandle from './companies';
import employeesHandle from './employees';

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

        case 'FETCH_EMPLOYEES_REQUEST':
        case 'FETCH_EMPLOYEE_REQUEST':
        case 'FETCH_EMPLOYEE_FAILED':
        case 'RESET_EMPLOYEE':
        case 'EMPLOYEE_DATA_CHANGE':
        case 'FAILED_EMPLOYEE_REQUEST':
            return employeesHandle(state, action);

        default:
            return state;
    }
}

export default reducer;