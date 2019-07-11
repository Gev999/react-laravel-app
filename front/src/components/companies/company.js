import React, { Component } from 'react';
import ErrorBoundary from '../error-boundary';
import { withApiService } from '../hoc-helpers';

class Company extends Component {

    state = {
        company: null,
        error: null,
    }
    apiService = this.props.apiService;

    componentWillMount() {
        this.getCompany();
    }

    getCompany = () => {
        const { id } = this.props.match.params;
        this.apiService.getCompany(id)
            .then(response => {
                this.setState({
                    company: response,
                })
            })
            .catch(e => {
                this.setState({
                    error: e.response.data.error,
                })
            })
    }

    getCompanyRow = () => {
        const { company } = this.state;
        return (
            <tr>
                <td><img alt="" src={company.logo} style={{ width: '50px' }} /></td>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.website}</td>
            </tr>
        )
    }

    render() {
        if (this.state.error) {
            return <ErrorBoundary error={this.state.error} />
        }
        const row = this.state.company ? this.getCompanyRow() : null;
        return (
            <div className="container">
                <table className="table table-hover table-striped table-border">
                    <thead>
                        <tr>
                            <td className="td-brand">Logo</td>
                            <td className="td-brand">Name</td>
                            <td className="td-brand">Email</td>
                            <td className="td-brand">Website</td>
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

export default withApiService(Company)