import initialState from './initial-state';
import userHandle from './user';
import companiesHandle from './companies';
import employeesHandle from './employees';
import * as actions from '../actions';

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.LOG_IN:
        case actions.LOG_OUT:
        case actions.USER_INPUT_DATA:
        case actions.USER_INPUT_DATA_ERROR:
            return userHandle(state, action);

        case actions.FETCH_COMPANIES_REQUEST:
        case actions.FETCH_COMPANY_REQUEST:
        case actions.FETCH_COMPANY_FAILED:
        case actions.RESET_COMPANY:
        case actions.COMPANY_DATA_CHANGE:
        case actions.FAILED_COMPANY_REQUEST:
        case actions.COMPANY_LOGO_FILE:
        case actions.COMPANY_LOGO:
            return companiesHandle(state, action);

        case actions.FETCH_EMPLOYEES_REQUEST:
        case actions.FETCH_EMPLOYEE_REQUEST:
        case actions.FETCH_EMPLOYEE_FAILED:
        case actions.RESET_EMPLOYEE:
        case actions.EMPLOYEE_DATA_CHANGE:
        case actions.FAILED_EMPLOYEE_REQUEST:
            return employeesHandle(state, action);

        default:
            return state;
    }
}

export default reducer;