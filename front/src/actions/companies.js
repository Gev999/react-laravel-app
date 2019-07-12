const getCompaniesList = (data) => {
    return {
        type: 'FETCH_COMPANIES_REQUEST',
        payload: data,
    }
}

const getCompany = (data) => {
    return {
        type: 'FETCH_COMPANY_REQUEST',
        payload: data,
    }
}

const failedToLoad = (error) => {
    return {
        type: 'FETCH_COMPANY_FAILED',
        payload: error,
    }
}

const setCompanyEmpty = () => {
    return {
        type: 'RESET_COMPANY'
    }
}

const setCompanyData = (e) => {
    return {
        type: 'COMPANY_DATA_CHANGE',
        payload: {
            name: e.target.name,
            value: e.target.value,
        }
    }
}

const failedRequest = (errors) => {
    return {
        type: 'FAILED_COMPANY_REQUEST',
        payload: errors,
    }
}

const setCompanyLogoFile = (file) => {
    return {
        type: 'COMPANY_LOGO_FILE',
        payload: file,
    }
}

const setCompanyLogo = (logo) => {
    return {
        type: 'COMPANY_LOGO',
        payload: logo
    }
}

export {
    getCompaniesList,
    getCompany,
    failedToLoad,
    setCompanyEmpty,
    setCompanyData,
    failedRequest,
    setCompanyLogo,
    setCompanyLogoFile
}