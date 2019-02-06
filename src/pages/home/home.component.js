import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';

import style from './home.style';

@inject('settings') @observer
class Home extends Component {
  render() {

    return(
      <div>Hello Home</div>
    );
  }
}

export default injectSheet(style)(Home);