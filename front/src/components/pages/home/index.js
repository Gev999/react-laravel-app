import React from 'react';
import { connect } from 'react-redux'

const Home = (props) => {
    return (
        <React.Fragment>
            <h1 style={{textAlign: 'center'}}>You are logged in!! { props.user && props.user.name } </h1>
        </React.Fragment>
    )
}

const mapStateToProps = ({  authUser })=> {
    return {
        user: authUser,
    }
}

export default connect(mapStateToProps)(Home)