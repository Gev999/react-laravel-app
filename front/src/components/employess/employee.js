import React, { Component } from 'react';
import ErrorBoundary from '../error-boundary';
import { withApiService } from '../hoc-helpers';
import { connect } from 'react-redux';
import { getEmployee, failedToLoad } from '../../actions/employees';

class Employee extends Component {

    apiService = this.props.apiService;

    componentWillMount() {
        this.getEmployee();
    }

    getEmployee = () => {
        const { id } = this.props.match.params;
        this.apiService.getEmployee(id)
            .then(response => {
                this.props.getEmployee(response)
            })
            .catch(e => {
                this.props.failedToLoad(e.response.data.error);
            })
    }

    getEmployeeRow = () => {
        const { employee } = this.props;
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
        if (this.props.error) {
            return <ErrorBoundary error={this.props.error} />
        }
        const row = this.getEmployeeRow();
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

const mapStateToProps = ( state ) => {
    return {
        employee: state.employee,
        error: state.errors.employee.error,
    }
}

const mapDispatchToProps = { 
    getEmployee,
    failedToLoad,
}

export default withApiService(connect(mapStateToProps, mapDispatchToProps)(Employee))