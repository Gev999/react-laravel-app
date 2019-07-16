import user from 'store/reducers/user';
import { companies, company} from 'store/reducers/companies';
import { employees, employee } from 'store/reducers/employees';
import { combineReducers } from 'redux'

const reducer = combineReducers({
    user,
    companies,
    company,
    employees,
    employee,
})

export default reducer;