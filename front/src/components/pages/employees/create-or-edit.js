import React, { Component } from 'react';
import { withApiService } from 'components/hoc-helpers';
import ErrorBoundary from 'components/base/error-boundary';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/actions/employees';
import { getAllCompanies } from 'store/actions/companies';

class EmployeeCreateOrEdit extends Component {
    
    apiService = this.props.apiService;
    isEdit  = false;

    state = {
        errors: {}
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.isEdit = !!id;
        if (id) {
            this.apiService.getEmployee(id)
                .then(response => {
                    this.props.getEmployee(response)
                })
                .then(() => {
                    this.props.getAllCompanies();
                })
                .catch(error => {
                    this.setState({
                        errors: {
                            ...this.state.errors,
                            error: error.response.data.error,
                        }
                    })
                })
        } else {
            this.props.setEmployeeEmpty()
            this.props.getAllCompanies();
        }
    }

    formHandle = (e) => {
        e.preventDefault();
        const { employee } = this.props;
        const handle = this.isEdit ? this.apiService.updateEmployee : this.apiService.createEmployee;
        handle(employee)
            .then(() => {
                this.props.history.push('/employees');
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors,
                })
            })
    }

    onChangeHandle = (e) => {
        this.props.setEmployeeData(e);
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: null,
            }
        })
    }

    optionsList = () => {
        const { companies } = this.props;
        return companies.map((company) => {
            return <option value={company.id} key={company.id}>{company.name}</option>
        })
    }


    render() {
        const { employee, companies } = this.props;
        const { errors } = this.state;
        if (errors.error) {
            return <ErrorBoundary error={errors.error} />
        }
        if (companies.length === 0) {
            return <ErrorBoundary error='First create company!!' />
        }
        const firstNameErr = errors.first_name && 'err-field';
        const lastNameErr = errors.last_name && 'err-field';
        const companyIdErr = errors.company_id && 'err-field';
        const emailErr = errors.email && 'err-field';
        const phoneErr = errors.phone && 'err-field';
        return (

            <div className="container mt-5">
                <form className="form-container" onSubmit={this.formHandle}>
                    <div className="form-group">
                        <label htmlFor="first-name">First name: </label>
                        <input className={`form-control ${firstNameErr}`} id="first-name" name="first_name" type="text"
                            value={employee.first_name ? employee.first_name : ''} onChange={this.onChangeHandle} required />
                    </div>
                    {firstNameErr &&
                        <div className="form-group">
                            <p className="err-msg">{errors.first_name}</p>
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="last-name">Last name: </label>
                        <input className={`form-control ${lastNameErr}`} id="last-name" name="last_name" type="text"
                            value={employee.last_name ? employee.last_name : ''} onChange={this.onChangeHandle} required />
                    </div>
                    {lastNameErr &&
                        <div className="form-group">
                            <p className="err-msg">{errors.last_name}</p>
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="company-id">Company</label>
                        <select name="company_id" className={`form-control ${companyIdErr}`} id="company-id"
                            value={employee.company_id ? employee.company_id : ''} onChange={this.onChangeHandle} required>
                            {!employee.company_id && <option disabled value=''>Choose Company</option>}
                            {this.optionsList()}
                        </select>
                    </div>
                    {companyIdErr &&
                        <div className="form-group">
                            <p className="err-msg">{errors.company_id}</p>
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="mail">Email: </label>
                        <input className={`form-control ${emailErr}`} id="mail" name="email" type="email"
                            value={employee.email ? employee.email : ''} onChange={this.onChangeHandle}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                    </div>
                    {emailErr &&
                        <div className="form-group">
                            <p className="err-msg">{errors.email}</p>
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="phone">Phone: </label>
                        <input className="form-control" id="phone" name="phone" type="text"
                            value={employee.phone ? employee.phone : ''} onChange={this.onChangeHandle} />
                    </div>
                    {phoneErr &&
                        <div className="form-group">
                            <p className="err-msg">{errors.phone}</p>
                        </div>
                    }

                    <button className="btn btn-outline-primary">{this.isEdit ? 'Update' : 'Create'}</button>
                    <Link to="/employees" className="ml-2 btn btn-outline-success">Cancel</Link>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employees.employee,
        companies: state.companies.all,
    }
}

const mapDispatchToProps = {
    ...actions,
    getAllCompanies,
}

export default withApiService(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(EmployeeCreateOrEdit)
    ));