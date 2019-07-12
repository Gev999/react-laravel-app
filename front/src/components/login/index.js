import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { connect } from 'react-redux';
import { loggedIn, userDataChange, userInputDataError } from '../../actions/user'

class Login extends Component {

    componentWillMount() {
        if (this.props.isLoggedIn) {
            this.props.history.push('/');
        }
    }

    isLoggedIn = (e) => {
        e.preventDefault();
        const { email, password } = this.props.user;
        axios.post('http://127.0.0.1:8000/api/auth/login', {
            email,
            password,
        })
            .then(res => {
                this.props.loggedIn(res.data.access_token);
                this.props.history.push('/');
            })
            .catch(e => {
                this.props.userInputDataError();
            })
    }

    render() {
        const { email, password } = this.props.user;
        const { userDataChange, error } = this.props;
        const clazz = error ? "form-control err-field" : "form-control";
        return (
            <div className="container mt-5">
                <form onSubmit={this.isLoggedIn} className="form-block">
                    <div className="form-group">
                        <input type="text" name="email" placeholder="Email" className={clazz}
                            value={email} onChange={userDataChange} required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" className={clazz}
                            value={password} onChange={userDataChange} required />
                    </div>
                    {error && (<p className='err-msg'>Wrong email or password</p>)}
                    <button className="btn btn-outline-secondary mt-2">Sign in</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => { 
    return {
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        error: state.errors.loginError,
    }
}

const mapDispatchToProps = {
    loggedIn,
    userDataChange,
    userInputDataError,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));