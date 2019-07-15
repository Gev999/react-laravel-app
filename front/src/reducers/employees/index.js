import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEE_REQUEST,
    FETCH_EMPLOYEE_FAILURE,
    RESET_EMPLOYEE,
    EMPLOYEE_DATA_CHANGE,
    FAILURE_EMPLOYEE_REQUEST,
} from '../../actions'

const employeesHandle = (state, action) => {
    switch (action.type) {

        case FETCH_EMPLOYEES_REQUEST:
            return {
                ...state,
                employees: action.payload,
            }

        case FETCH_EMPLOYEE_REQUEST:
            return {
                ...state,
                employee: action.payload,
                errors: {
                    ...state.errors,
                    employee: {
                        ...state.errors.employee,
                        error: false,
                    }
                }
            }

        case FETCH_EMPLOYEE_FAILURE:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    employee: {
                        ...state.errors.employee,
                        error: action.payload,
                    }
                }
            }

        case RESET_EMPLOYEE:
            return {
                ...state,
                employee: {},
                errors: {
                    ...state.errors,
                    employee: {}
                }
            }

        case EMPLOYEE_DATA_CHANGE:
            return {
                ...state,
                employee: {
                    ...state.employee,
                    [action.payload.name]: action.payload.value,
                },
                errors: {
                    ...state.errors,
                    employee: {
                        ...state.errors.employee,
                        [action.payload.name]: '',
                    }
                }
            }

        case FAILURE_EMPLOYEE_REQUEST:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    employee: action.payload
                }
            }

        default: return state;
    }
}

export default employeesHandle;