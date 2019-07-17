import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEE_REQUEST,
    RESET_EMPLOYEE,
    EMPLOYEE_DATA_CHANGE,
} from './index';

import ApiService from 'services/api-service';
const apiService = new ApiService();

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

// thunk action

const getAllEmployees = () => (dipsatch) => {
    apiService.getAllEmployees().then(response => dipsatch({
        type: FETCH_EMPLOYEES_REQUEST,
        payload: response,
    }))
}

export {
    getEmployee,
    setEmployeeEmpty,
    setEmployeeData,

    getAllEmployees,
}