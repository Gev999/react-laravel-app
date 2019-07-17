import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANY_REQUEST,
    RESET_COMPANY,
    COMPANY_DATA_CHANGE,
    COMPANY_LOGO_FILE,
    COMPANY_LOGO,

} from './index';

import ApiService from 'services/api-service';
const apiService = new ApiService();

const getCompany = (data) => {
    return {
        type: FETCH_COMPANY_REQUEST,
        payload: data,
    }
}

const setCompanyEmpty = () => {
    return {
        type: RESET_COMPANY
    }
}

const setCompanyData = (e) => {
    return {
        type: COMPANY_DATA_CHANGE,
        payload: {
            name: e.target.name,
            value: e.target.value,
        }
    }
}

const setCompanyLogoFile = (file) => {
    return {
        type: COMPANY_LOGO_FILE,
        payload: file,
    }
}

const setCompanyLogo = (logo) => {
    return {
        type: COMPANY_LOGO,
        payload: logo
    }
}

// thunk action

const getAllCompanies = () => (dispatch) => {
    return apiService.getAllCompanies().then(response=>dispatch({
        type: FETCH_COMPANIES_REQUEST,
        payload: response,
    }))
}

export {
    getCompany,
    setCompanyEmpty,
    setCompanyData,
    setCompanyLogo,
    setCompanyLogoFile,

    getAllCompanies,
}