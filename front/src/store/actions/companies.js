import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANY_REQUEST,
    RESET_COMPANY,
    COMPANY_DATA_CHANGE,
    COMPANY_LOGO_FILE,
    COMPANY_LOGO,

} from './index'

const getCompaniesList = (data) => {
    return {
        type: FETCH_COMPANIES_REQUEST,
        payload: data,
    }
}

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

export {
    getCompaniesList,
    getCompany,
    setCompanyEmpty,
    setCompanyData,
    setCompanyLogo,
    setCompanyLogoFile
}