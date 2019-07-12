import React, { Component } from 'react';
import ErrorBoundary from '../error-boundary';
import { withApiService } from '../hoc-helpers';
import { connect } from 'react-redux';
import { getCompany, failedToLoad } from '../../actions/companies';

class Company extends Component {

    apiService = this.props.apiService;

    componentWillMount() {
        this.getCompany();
    }

    getCompany = () => {
        const { id } = this.props.match.params;
        this.apiService.getCompany(id)
            .then(response => {
                this.props.getCompany(response)
            })
            .catch(e => {
                this.props.failedToLoad(e.response.data.error);
            })
    }

    getCompanyRow = () => {
        const { company } = this.props;
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
        if (this.props.error) {
            return <ErrorBoundary error={this.props.error} />
        }
        const row =  this.getCompanyRow();
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

const mapStateToProps = ( state ) => {
    return {
        company: state.company,
        error: state.errors.company.error,
    }
}

const mapDispatchToProps = { 
    getCompany,
    failedToLoad,
}

export default withApiService(connect(mapStateToProps, mapDispatchToProps)(Company))