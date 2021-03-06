import React, { Component } from 'react';
import ErrorBoundary from 'components/base/error-boundary';
import { withApiService } from 'components/hoc-helpers';
import { connect } from 'react-redux';
import { getEmployee } from 'store/actions/employees';

class Employee extends Component {

    apiService = this.props.apiService;

    state = {
        error: null,
    }

    componentDidMount() {
        this.getEmployee();
    }

    getEmployee = () => {
        const { id } = this.props.match.params;
        this.apiService.getEmployee(id)
            .then(response => {
                this.props.getEmployee(response)
            })
            .catch(e => {
                this.setState({
                    error: e.response.data.error,
                })
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
        if (this.state.error) {
            return <ErrorBoundary error={this.state.error} />
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

const mapStateToProps = ( { employees } ) => ({ employee: employees.employee })

const mapDispatchToProps = { getEmployee }

export default withApiService(connect(mapStateToProps, mapDispatchToProps)(Employee))