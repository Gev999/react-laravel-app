import * as companies from '../handles/companies';

const companiesHandle = (state, action) => {
    switch(action.type) {

        case 'FETCH_COMPANIES_REQUEST': 
            return companies.getAllCompanies(state, action.payload);
        
        case 'FETCH_COMPANY_REQUEST':
            return companies.getCompany(state, action.payload);

        case 'FETCH_COMPANY_FAILED':
            return companies.failedToLoad(state, action.payload);
        
        case 'RESET_COMPANY':
            return companies.setCompanyEmpty(state);

        case 'COMPANY_DATA_CHANGE':
            return companies.setCompanyData(state, action.payload)

        case 'FAILED_COMPANY_REQUEST':
            return companies.failedRequest(state, action.payload)

        case 'COMPANY_LOGO_FILE':
            return companies.setCompanyLogoFile(state, action.payload)
        
        case 'COMPANY_LOGO':
            return companies.setCompanyLogo(state, action.payload)

        default: return state;
    }
}

export default companiesHandle;