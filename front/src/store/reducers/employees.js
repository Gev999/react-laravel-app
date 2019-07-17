import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEE_REQUEST,
    RESET_EMPLOYEE,
    EMPLOYEE_DATA_CHANGE,
} from 'store/actions'


const initialState = {
    all: [],
    employee: {},
}

const employees = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_EMPLOYEES_REQUEST:
            return {
                ...state,
                all: action.payload,
            }
        
        case FETCH_EMPLOYEE_REQUEST:
            return {
                ...state,
                employee: action.payload,
            }

        case RESET_EMPLOYEE:
            return  {
                ...state,
                employee: {}
            };

        case EMPLOYEE_DATA_CHANGE:
            return  {
                ...state,
                employee : {
                    ...state.employee,
                    [action.payload.name]: action.payload.value,
                }
            }

        default: return state;
    }
}


export default employees;