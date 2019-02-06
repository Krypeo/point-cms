import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';

import style from './users.style';

@inject('settings') @observer
class Users extends Component {
  render() {

    return(
      <div>Hello Users</div>
    );
  }
}

export default injectSheet(style)(Users);