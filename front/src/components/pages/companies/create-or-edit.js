import React, { Component } from 'react';
import { withApiService } from 'components/hoc-helpers';
import ErrorBoundary from 'components/base/error-boundary';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/actions/companies';

class CompanyCreateOrEdit extends Component {
    
    apiService = this.props.apiService;
    isEdit = false;

    state = {
        errors: {},
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.isEdit = !!id;
        if (id) {
            this.apiService.getCompany(id)
                .then(response => {
                    this.props.getCompany(response);
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
            this.props.setCompanyEmpty()
        }
    }

    onImageChangeHandle = (e) => {
        this.props.setCompanyLogoFile(e.target.files[0]);
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        let reader = new FileReader();
        reader.onload = (e) => {
            this.props.setCompanyLogo(e.target.result);
        };
        reader.readAsDataURL(files[0]);
    }

    onChangeHandle = (e) => {
        this.props.setCompanyData(e);
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: null,
            }
        })
    }

    formHandle = (e) => {
        e.preventDefault();
        const { company } = this.props;
        const handle = this.isEdit ? this.apiService.updateCompany : this.apiService.createCompany;
        handle(company)
            .then(() => {
                this.props.history.push('/companies');
            })
            .catch(error => {
                console.log(error)
                // this.setState({
                //     errors: error.response.data.errors,
                // })
            })
    }


    render() {
        const { company } = this.props;
        const { errors } = this.state;
        if (errors.error) {
            return <ErrorBoundary error={errors.error} />
        }
        const nameErr = errors.name && 'err-field';
        const emailErr = errors.email && 'err-field';
        const logoErr = errors.logo && 'err-field';
        return (
            <div className="container mt-5">
                <form className="form-container" encType="multipart/form-data" onSubmit={this.formHandle}>
                    <div className="form-group">
                        <label htmlFor="logo">Logo: </label>
                        <img alt="" src={company.logo} style={{ width: '70px' }} className="ml-2 mb-2" />
                        <br />
                        <input type='file' id="logo" name="logo" accept="image/*" onChange={this.onImageChangeHandle} />
                    </div>
                    {logoErr &&
                        <div className="form-group">
                            <p className="err-msg">{errors.logo}</p>
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="name">Company name: </label>
                        <input className={`form-control ${nameErr}`} id="name" name="name" type="text"
                            value={company.name ? company.name : ''} onChange={this.onChangeHandle}  required/>
                    </div>
                    {nameErr &&
                        <div className="form-group">
                            <p className="err-msg">{errors.name}</p>
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="mail">Email: </label>
                        <input className={`form-control ${emailErr}`} id="mail" name="email" type="email"
                            value={company.email ? company.email : ''} onChange={this.onChangeHandle}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                    </div>
                    {emailErr &&
                        <div className="form-group">
                            <p className="err-msg">{errors.email}</p>
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="website">Website: </label>
                        <input className="form-control" id="website" name="website" type="text"
                            value={company.website ? company.website : ''} onChange={this.onChangeHandle} />
                    </div>
                    <button className="btn btn-outline-primary">{this.isEdit ? 'Update' : 'Create'}</button>
                    <Link to="/companies" className="ml-2 btn btn-outline-success">Cancel</Link>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ( { companies } ) => ({ company: companies.company })


export default withApiService(
                    withRouter(
                        connect(mapStateToProps, actions)(CompanyCreateOrEdit)
                    ));