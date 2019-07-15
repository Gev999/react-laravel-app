import initialState from './initial-state';
import userHandle from 'store/reducers/user';
import companiesHandle from 'store/reducers/companies';
import employeesHandle from 'store/reducers/employees';
import * as actions from 'store/actions';

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.LOG_IN:
        case actions.LOG_OUT:
        case actions.USER_INPUT_DATA:
        case actions.USER_INPUT_DATA_ERROR:
            return userHandle(state, action);

        case actions.FETCH_COMPANIES_REQUEST:
        case actions.FETCH_COMPANY_REQUEST:
        case actions.FETCH_COMPANY_FAILURE:
        case actions.RESET_COMPANY:
        case actions.COMPANY_DATA_CHANGE:
        case actions.FAILED_COMPANY_REQUEST:
        case actions.COMPANY_LOGO_FILE:
        case actions.COMPANY_LOGO:
            return companiesHandle(state, action);

        case actions.FETCH_EMPLOYEES_REQUEST:
        case actions.FETCH_EMPLOYEE_REQUEST:
        case actions.FETCH_EMPLOYEE_FAILURE:
        case actions.RESET_EMPLOYEE:
        case actions.EMPLOYEE_DATA_CHANGE:
        case actions.FAILURE_EMPLOYEE_REQUEST:
            return employeesHandle(state, action);

        default:
            return state;
    }
}

export default reducer;