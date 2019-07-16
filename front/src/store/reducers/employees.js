import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEE_REQUEST,
    RESET_EMPLOYEE,
    EMPLOYEE_DATA_CHANGE,
} from 'store/actions'


const employees = (state = [], action) => {
    switch (action.type) {

        case FETCH_EMPLOYEES_REQUEST:
            return action.payload;
        
        default: return state;
    }
}

const employee = (state = {}, action) => {
    switch (action.type) {

        case FETCH_EMPLOYEE_REQUEST:
            return action.payload;

        case RESET_EMPLOYEE:
            return  {};

        case EMPLOYEE_DATA_CHANGE:
            return  {
                    ...state,
                    [action.payload.name]: action.payload.value,
                };

        default: return state;
    }
}

export {
    employees, employee,
};