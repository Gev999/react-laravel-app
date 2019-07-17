import React, { Component } from 'react';
import ErrorBoundary from 'components/base/error-boundary';
import { withApiService } from 'components/hoc-helpers';
import { connect } from 'react-redux';
import { getCompany  } from 'store/actions/companies';

class Company extends Component {

    apiService = this.props.apiService;

    state = {
        error: null,
    }

    componentDidMount() {
        this.getCompany();
    }

    getCompany = () => {
        const { id } = this.props.match.params;
        this.apiService.getCompany(id)
            .then(response => {
                this.props.getCompany(response)
            })
            .catch(e => {
                this.setState({
                    error: e.response.data.error,
                })
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
        if (this.state.error) {
            return <ErrorBoundary error={this.state.error} />
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

const mapStateToProps = ( { companies } ) => ({ company: companies.company })

const mapDispatchToProps = { 
    getCompany,
}

export default withApiService(connect(mapStateToProps, mapDispatchToProps)(Company))