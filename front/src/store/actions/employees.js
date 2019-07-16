import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEE_REQUEST,
    RESET_EMPLOYEE,
    EMPLOYEE_DATA_CHANGE,
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

export {
    getEmployeesList,
    getEmployee,
    setEmployeeEmpty,
    setEmployeeData,
}