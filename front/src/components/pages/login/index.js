import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { connect } from 'react-redux';
import { withApiService } from 'components/hoc-helpers';
import { loggedIn } from 'store/actions/user';
import GoogleLogin from 'react-google-login';

class Login extends Component {

    apiService = this.props.apiService;
    _baseUrl = 'http://127.0.0.1:8080/api/auth';

    state = {
        email: '',
        password: '',
        error: null,
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push('/');
        }
    }
    
    onChangeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })

    }

    isLoggedIn = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        axios.post(`${this._baseUrl}/login`, {
            email,
            password,
        })
            .then(res => {
                this.authUser(res);
                //console.log(res)
            })
            .catch(e => {
                this.setState({
                    error: e.response,
                })
            })
    }

    responseGoogle = (response) =>{
        if (response) {
            axios.post(`${this._baseUrl}/provider/user`, {...response.profileObj, provider: 'google' })
            .then(res=>{
                this.authUser(res);
            })
            .catch(e=>{
                console.log(e.response)
            })
        }
    }

    authUser = (res) => {
        localStorage.setItem('token', res.data.access_token);
        this.apiService.getUser()
            .then(res => {
                this.props.loggedIn(res.data.user);
            })
        this.props.history.push('/');
    }

    render() {
        const { email, password, error } = this.state;
        const clazz = error ? "form-control err-field" : "form-control";
        return (
            <div className="container mt-5">
                <form onSubmit={this.isLoggedIn} className="form-block">
                    <div className="form-group">
                        <input type="text" name="email" placeholder="Email" className={clazz}
                            value={email} onChange={this.onChangeHandle} required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" className={clazz}
                            value={password} onChange={this.onChangeHandle} required />
                    </div>
                    {error && (<p className='err-msg'>Wrong email or password</p>)}
                    <button className="btn btn-outline-secondary mt-2">Sign in</button>
                    <hr />
                    {/* <GoogleLogin
                        clientId="152140133075-kscohg20nsdp2246d8r6jc735qp3qcqd.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    /> */}
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({  user })=> {
    return {
        user,
    }
}

const mapDispatchToProps = { loggedIn };

export default withRouter(withApiService(connect(mapStateToProps, mapDispatchToProps)(Login)));