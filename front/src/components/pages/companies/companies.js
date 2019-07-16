import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withApiService } from 'components/hoc-helpers';
import { connect } from 'react-redux';
import { getCompaniesList } from 'store/actions/companies';

class Companies extends Component {

    apiService = this.props.apiService;

    componentDidMount() {
        this.getCompanies();
    }

    getCompanies = () => {
        this.apiService.getAllCompanies()
            .then(response => {
                this.props.getCompaniesList(response)
            })
    }

    deleteCompany = (e) =>  {
        if (window.confirm('Are you sure?')) {
            const id = e.target.value;
            this.apiService.deleteCompany(id)
                .then(() => {
                    this.getCompanies();
                })
        }
    }

    getCompaniesRows = () =>  {
        const { companies } = this.props;
        if (!companies) return null;
        return companies.map((company) => {
            return (
                <tr key={company.id}>
                    <td><img alt="" src={company.logo} style={{width: '50px'}} /></td>
                    <td>{company.name}</td>
                    <td>{company.email}</td>
                    <td>{company.website}</td>
                    <td><Link to={`/companies/${company.id}`}>View</Link></td>
                    <td><Link to={`/companies/${company.id}/edit`}>Edit</Link></td>
                    <td><button className="btn btn-link p-0 m-0"
                        onClick={this.deleteCompany} value={company.id}>
                        Delete
                    </button></td>
                </tr>
            )
        })
    }

    render() {
        const { companies } = this.props;
        const view = companies.length === 0 ? null : this.getCompaniesRows();
        return (
            <div className="container">
                <h2>Companies</h2>
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
                        {view}
                    </tbody>
                </table>
                <Link to='/companies/create' className="btn btn-outline-secondary mt-4">Create company</Link>
            </div>
        )
    }
}

const mapStateToProps = ({ companies }) => ({ companies });
const mapDispatchToProps = { getCompaniesList }


export default withApiService(connect(mapStateToProps, mapDispatchToProps)(Companies));