import React, { Component } from 'react';
import ErrorBoundary from '../error-boundary';
import { withApiService } from '../hoc-helpers';

class Employee extends Component {

    state = {
        employee: null,
        error: null,
    }
    apiService = this.props.apiService;

    componentWillMount() {
        this.getEmployee();
    }

    getEmployee = () => {
        const { id } = this.props.match.params;
        this.apiService.getEmployee(id)
            .then(response => {
                this.setState({
                    employee: response,
                })
            })
            .catch(e => {
                this.setState({
                    error: e.response.data.error,
                })
            })
    }

    getEmployeeRow = () => {
        const { employee } = this.state;
        return (
            <tr>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.company_id}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
            </tr>
        )
    }

    render() {
        if (this.state.error) {
            return <ErrorBoundary error={this.state.error} />
        }
        const row = this.state.employee ? this.getEmployeeRow() : null;
        return (
            <div className="container">
                <table className="table table-hover table-striped table-border">
                    <thead>
                        <tr>
                            <td className="td-brand">First Name</td>
                            <td className="td-brand">Last Name</td>
                            <td className="td-brand">Company ID</td>
                            <td className="td-brand">Email</td>
                            <td className="td-brand">Phone</td>
                        </tr>
                    </thead>
                    <tbody>
                        {row}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withApiService(Employee)