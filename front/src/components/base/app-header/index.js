import React from 'react';
import { Link } from 'react-router-dom';
import { loggedOut } from 'store/actions/user';
import { connect } from 'react-redux';

const Header = (props)=>{
    return (
        <React.Fragment>
            <nav className="navbar navbar-default">
                <div className="container mt-4">
                    <div>
                        <Link to="/" className="navbar-brand" style={{color: "grey"}}>Home</Link>
                        <Link to="/companies" className="btn btn-outline-secondary mr-4 ml-4">Companies</Link>
                        <Link to="/employees" className="btn btn-outline-secondary">Employees</Link>
                    </div>
                    <button className="btn btn-link" onClick={props.loggedOut}>Log out</button>
                </div>
            </nav>
            <hr />
        </React.Fragment>
    )
}


const mapDispatchToProps = { loggedOut }

export default connect(null, mapDispatchToProps)(Header);