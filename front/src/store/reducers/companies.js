import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANY_REQUEST,
    RESET_COMPANY,
    COMPANY_DATA_CHANGE,
    COMPANY_LOGO_FILE,
    COMPANY_LOGO,

} from 'store/actions'

const initialState = {
    all: [],
    company: {},
}

const companies = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_COMPANIES_REQUEST:
            return {
                ...state,
                all: action.payload,
            }

            case FETCH_COMPANY_REQUEST:
                return {
                    ...state,
                    company: action.payload,
                }
    
            case RESET_COMPANY:
                return {
                    ...state,
                    company: {}
                };
    
            case COMPANY_DATA_CHANGE:
                return {
                    ...state,
                    company : {
                        ...state.company,
                        [action.payload.name]: action.payload.value,
                    }
            }
    
            case COMPANY_LOGO_FILE:
                return {
                    ...state,
                    company: {
                        ...state.company,
                        file: action.payload,
                    }
                }
    
            case COMPANY_LOGO:
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


export default companies;