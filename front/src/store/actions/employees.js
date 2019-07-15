import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEE_REQUEST,
    FETCH_EMPLOYEE_FAILURE,
    RESET_EMPLOYEE,
    EMPLOYEE_DATA_CHANGE,
    FAILURE_EMPLOYEE_REQUEST,
} from './index'

const getEmployeesList = (data) => {
    return {
        type: FETCH_EMPLOYEES_REQUEST,
        payload: data,
    }
}

const getEmployee = (data) => {
    return {
        type: FETCH_EMPLOYEE_REQUEST,
        payload: data,
    }
}

const failedToLoad = (error) => {
    return {
        type: FETCH_EMPLOYEE_FAILURE,
        payload: error,
    }
}

const setEmployeeEmpty = () => {
    return {
        type: RESET_EMPLOYEE
    }
}

const setEmployeeData = (e) => {
    return {
        type: EMPLOYEE_DATA_CHANGE,
        payload: {
            name: e.target.name,
            value: e.target.value,
        }
    }
}

const failedRequest = (errors) => {
    return {
        type: FAILURE_EMPLOYEE_REQUEST,
        payload: errors,
    }
}

export {
    getEmployeesList,
    getEmployee,
    failedToLoad,
    setEmployeeEmpty,
    setEmployeeData,
    failedRequest,
}