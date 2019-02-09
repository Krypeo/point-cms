import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import firebase from '../../lib/api/config.api';

import MainLayoutComponent from './layout/layout.component';
import LoginComponent from './login.component';

const style = [];

@observer
class Root extends Component {
  constructor() {
    super();
    firebase.auth().onAuthStateChanged((data) => this.setState({ user: data != null }));
    firebase.auth().onAuthStateChanged((user) => this.setState({ uid: user.uid }));
    this.state = {
      user: false
    }
  }

  render() {

    return (
      <div>
        {
          this.state.user
            ? (<MainLayoutComponent />)
            : (<LoginComponent />)
        }
      </div>
    );
  }
}

export default injectSheet(style)(withRouter(Root));