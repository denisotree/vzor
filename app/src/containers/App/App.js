import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from "react-redux";

import CommonLayout from '../CommonLayout/CommonLayout';
import BaseRouter from '../../routes';
import * as actions from '../../store/actions/auth'

import './style.scss';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
        this.props.onGetCurrentUserData();
    }

    render() {
    return (
      <Router>
          <CommonLayout {...this.props}>
              <BaseRouter />
          </CommonLayout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
      return{
          isAuthenticated: state.token !== null,
          username: state.username,
          currentUser: state.currentUser
      }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
        onGetCurrentUserData: () => dispatch(actions.getCurrentUserData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
