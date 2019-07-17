import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from 'components/hoc-helpers';
import Login from 'components/pages/login';
import Home from 'components/pages/home';
import Header from 'components/base/app-header';
import { Companies, Company, CompanyCreateOrEdit } from 'components/pages/companies';
import { Employees, Employee, EmployeeCreateOrEdit } from 'components/pages/employees';
import { ApiServiceProvider } from 'components/base/api-service-context';
import ApiService from 'services/api-service';
import { connect } from 'react-redux';
import store from 'store'

class App extends React.Component {

    apiService = new ApiService();

    componentDidMount() {
        localStorage.getItem('token') && this.apiService.getUser()
            .then(res => {
                store.dispatch({ type: 'LOG_IN', payload: res.data.user })
            })
    }

    render() {
        const { user } = this.props;
        return (
            <ApiServiceProvider value={this.apiService}>
                {user && <Header />}
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
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(App);