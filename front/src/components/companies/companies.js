import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withApiService } from '../hoc-helpers';

class Companies extends Component {

    state = {
        companies: [],
    }

    apiService = this.props.apiService;

    componentWillMount() {
        this.getCompanies();
    }

    getCompanies = () => {
        this.apiService.getAllCompanies()
            .then(response => {
                this.setState({
                    companies: response,
                })
            })
    }

    deleteCompany = (e) =>  {
        if (window.confirm('Are you sure?')) {
            const id = e.target.value;
            this.apiService.deleteCompany(id)
                .then(res => {
                    this.getCompanies();
                })
                .catch(e => {
                    console.log(e.response)
                })
        }
    }

    getCompaniesRows = () =>  {
        const { companies } = this.state;
        if (!companies) return null;
        const imgStyle = {
            width: '50px',
        }
        return companies.map((company) => {
            let imgSrc = company.logo ? company.logo : 'default.png'
            return (
                <tr key={company.id}>
                    <td><img alt="" src={`/storage/logos/${imgSrc}`} style={imgStyle} /></td>
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
        const { companies } = this.state;
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

export default withApiService(Companies)