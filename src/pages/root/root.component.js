import React, { Component } from 'react';
import injectSheet from 'react-jss';

import MainLayoutComponent from './layout/layout.component';

const style = [];

class Root extends Component {
  render() {

    return (
      <div>
        <MainLayoutComponent />
      </div>
    );
  }
}

export default injectSheet(style)(Root);