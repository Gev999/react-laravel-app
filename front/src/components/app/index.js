import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../hoc-helpers';
import Login from '../login';
import Home from '../home';
import Header from '../app-header';
import { Companies, Company, CompanyCreateOrEdit } from '../companies';
import { Employees, Employee, EmployeeCreateOrEdit } from '../employess';
import { ApiServiceProvider } from '../api-service-context';
import ApiService from '../../api-service';
import { connect } from 'react-redux';

const App = (props) => {
    const apiService = new ApiService();
    return (
        <ApiServiceProvider value={apiService}>
            {props.isLoggedIn && <Header />}
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

const mapStateToProps = (state) => ({ isLoggedIn: state.isLoggedIn })

export default connect(mapStateToProps)(App);