const Auth = require('./auth');
const Companies = require('./companies');
const Employees = require('./employees');

module.exports = [
    Auth,
    ...Companies,
    ...Employees,
]