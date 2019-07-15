import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from 'components/hoc-helpers';
import Login from 'components/pages/login';
import Home from 'components/pages/home';
import Header from 'components/base/app-header';
import { Companies, Company, CompanyCreateOrEdit } from 'components/pages/companies';
import { Employees, Employee, EmployeeCreateOrEdit } from 'components/pages/employess';
import { ApiServiceProvider } from 'components/base/api-service-context';
import ApiService from 'services/api-service';
import { connect } from 'react-redux';

const App = ({ isLoggedIn }) => {
    const apiService = new ApiService();
    return (
        <ApiServiceProvider value={apiService}>
            {isLoggedIn && <Header />}
            <Switch>
                <PrivateRoute exact path="/" component={Home} />

                <PrivateRoute exact path="/companies/" component={Companies} />
                <PrivateRoute exact path="/companies/:id(\d+)" component={Company} />
                <PrivateRoute exact path="/companies/create" component={CompanyCreateOrEdit} />
                <PrivateRoute exact path="/companies/:id(\d+)/edit" component={CompanyCreateOrEdit} />

                <PrivateRoute exact path="/employees/" component={Employees} />
                <PrivateRoute exact path="/employees/:id(\d+)" component={Employee} />
                <PrivateRoute exact path="/employees/create" component={EmployeeCreateOrEdit} />
                <PrivateRoute exact path="/employees/:id(\d+)/edit" component={EmployeeCreateOrEdit} />

                <Route exact path="/login" component={Login} />
                <Route render={() => <h1 style={{ textAlign: 'center' }}>Page not found!!</h1>} />
            </Switch>
        </ApiServiceProvider>
    )
}

const mapStateToProps = ({ isLoggedIn }) => ({ isLoggedIn });

export default connect(mapStateToProps)(App);