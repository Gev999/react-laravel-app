const getAllCompanies = (state, data) => {
    return {
        ...state,
        companies: data,
    }
}

const getCompany = (state, data) => {
    return {
        ...state,
        company: data,
        errors: {
            ...state.errors,
            company: {
                ...state.errors.company,
                error: false,
            }
        }
    }
}

const setCompanyEmpty = (state) => {
    return {
        ...state,
        company: {},
        errors: {
            ...state.errors,
            company: {}
        }
    }
}

const setCompanyData = (state, data) => {
    return {
        ...state,
        company: {
            ...state.company,
            [data.name]: data.value,
        },
        errors: {
            ...state.errors,
            company: {
                ...state.errors.company,
                [data.name]: '',
            }
        }
    }
}

const failedToLoad = (state, error) => {
    return {
        ...state,
        errors: {
            ...state.errors,
            company: {
                ...state.errors.company,
                error,
            }
        }
    }
}

const failedRequest = (state, errors) => {
    return {
        ...state,
        errors: {
            ...state.errors,
            company: errors
        }
    }
}

const setCompanyLogoFile = (state, file) => {
    return {
        ...state,
        company: {
            ...state.company,
            file,
        }
    }
}

const setCompanyLogo = (state, logo) => {
    return {
        ...state,
        company: {
            ...state.company,
            logo,
        }
    }
}

export {
    getAllCompanies,
    getCompany,
    failedToLoad,
    setCompanyEmpty,
    setCompanyData,
    failedRequest,
    setCompanyLogo,
    setCompanyLogoFile,
}