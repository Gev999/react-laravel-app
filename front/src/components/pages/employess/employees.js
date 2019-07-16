import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withApiService } from 'components/hoc-helpers';
import { getEmployeesList } from 'store/actions/employees';
import { connect } from 'react-redux';

class Employees extends Component {

    apiService = this.props.apiService;

    componentDidMount() {
        this.getEmployees();
    }

    getEmployees = () => {
        this.apiService.getAllEmployees()
            .then(response => {
                this.props.getEmployeesList(response);
            })
    }

    deleteEmployee = (e) => {
        if (window.confirm('Are you sure?')) {
            const id = e.target.value;
            this.apiService.deleteEmployee(id)
                .then(() => {
                    this.getEmployees();
                })
        }
    }

    getEmployeesRows = () => {
        const { employees } = this.props;
        if (!employees) return null;
        return employees.map((employee) => {
            return (
                <tr key={employee.id}>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.company_id}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td><Link to={`/employees/${employee.id}`}>View</Link></td>
                    <td><Link to={`/employees/${employee.id}/edit`}>Edit</Link></td>
                    <td><button className="btn btn-link p-0 m-0"
                        onClick={this.deleteEmployee} value={employee.id}>
                        Delete
                    </button></td>
                </tr>
            )
        })
    }

    render() {
        const { employees } = this.props;
        const view = employees.length === 0 ? null : this.getEmployeesRows();
        return (
            <div className="container">
                <h2>Employees</h2>
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
                        {view}
                    </tbody>
                </table>
                <Link to='/employees/create' className="btn btn-outline-secondary mt-4">Create employee</Link>
            </div>
        )
    }
}

const mapStateToProps = ({ employees }) => ({ employees });
const mapDispatchToProps = { getEmployeesList }

export default withApiService(connect(mapStateToProps, mapDispatchToProps)(Employees));