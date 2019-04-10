import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import firebase from '../../lib/api/config.api';

import LoadingComponent from './loading.component';
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
      user: false,
      loading: true,
      uid: null
    }
  }

  loadingPrefix = () => {
    return (<LoadingComponent />)
  };

  autoContent = () => {
    const { user, loading, uid } = this.state;

    if (loading) {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 2500);
      return (<LoadingComponent />)
    } else if (!loading && user) {
      return (<MainLayoutComponent uid={uid} />)
    } else if (!user) {
      return (<LoginComponent />)
    };
  };

  render() {

    return (
      <div>
        {this.autoContent()}
      </div>
    );
  }
}

export default injectSheet(style)(withRouter(Root));