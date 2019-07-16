import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANY_REQUEST,
    RESET_COMPANY,
    COMPANY_DATA_CHANGE,
    COMPANY_LOGO_FILE,
    COMPANY_LOGO,

} from 'store/actions'

const companies = (state = [], action) => {
    switch (action.type) {

        case FETCH_COMPANIES_REQUEST:
            return action.payload;

        default: return state;
    }
}

const company = (state = {}, action) => {
    switch (action.type) {

        case FETCH_COMPANY_REQUEST:
            return action.payload;

        case RESET_COMPANY:
            return {};

        case COMPANY_DATA_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }

        case COMPANY_LOGO_FILE:
            return {
                    ...state,
                    file: action.payload,
            }

        case COMPANY_LOGO:
            return {
                    ...state,
                    logo: action.payload,
            }

        default: return state;
    }
}

export {
    companies, company
};