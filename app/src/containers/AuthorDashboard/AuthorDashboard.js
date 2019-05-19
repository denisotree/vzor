import React from "react";
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import DashboardContent from "../../components/DashboardContent";

import "./style.scss";

class AuthorDashboard extends React.Component {

    render() {
        return (
            <Route path="/" render={() => (
                this.props.isAuthenticated ? (
                    <DashboardContent {...this.props}/>
                ) : (
                    <Redirect to="/login/"/>
                )
            )}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        currentUser: state.currentUser,
    }
};



export default connect(mapStateToProps)(AuthorDashboard);