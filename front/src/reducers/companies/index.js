const companiesHandle = (state, action) => {
    switch (action.type) {

        case 'FETCH_COMPANIES_REQUEST':
            return {
                ...state,
                companies: action.payload,
            }

        case 'FETCH_COMPANY_REQUEST':
            return {
                ...state,
                company: action.payload,
                errors: {
                    ...state.errors,
                    company: {
                        ...state.errors.company,
                        error: false,
                    }
                }
            }

        case 'FETCH_COMPANY_FAILED':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    company: {
                        ...state.errors.company,
                        error: action.payload,
                    }
                }
            }

        case 'RESET_COMPANY':
            return {
                ...state,
                company: {},
                errors: {
                    ...state.errors,
                    company: {}
                }
            }

        case 'COMPANY_DATA_CHANGE':
            return {
                ...state,
                company: {
                    ...state.company,
                    [action.payload.name]: action.payload.value,
                },
                errors: {
                    ...state.errors,
                    company: {
                        ...state.errors.company,
                        [action.payload.name]: '',
                    }
                }
            }

        case 'FAILED_COMPANY_REQUEST':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    company: action.payload
                }
            }

        case 'COMPANY_LOGO_FILE':
            return {
                ...state,
                company: {
                    ...state.company,
                    file: action.payload,
                }
            }

        case 'COMPANY_LOGO':
            return {
                ...state,
                company: {
                    ...state.company,
                    logo: action.payload,
                }
            }

        default: return state;
    }
}

export default companiesHandle;