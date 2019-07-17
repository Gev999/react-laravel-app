import user from 'store/reducers/user';
import companies from 'store/reducers/companies';
import employees from 'store/reducers/employees';
import { combineReducers } from 'redux'

const reducer = combineReducers({
    user,
    companies,
    employees,
})

export default reducer;