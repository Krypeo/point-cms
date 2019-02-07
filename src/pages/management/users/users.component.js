import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';

import style from './users.style';
import store from './users.store';

@inject('settings') @observer
class Users extends Component {

  componentDidMount() {
    store.refresh();
  }

  render() {
    console.log(this.props.settings);
    return (
      <div onClick={() => this.push()}>Hello Users</div>
    );
  }
}

export default injectSheet(style)(Users);