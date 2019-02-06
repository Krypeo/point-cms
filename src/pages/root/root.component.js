import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import MainLayoutComponent from './layout/layout.component';

const style = [];

@observer
class Root extends Component {
  render() {

    return (
      <div>
        <MainLayoutComponent />
      </div>
    );
  }
}

export default injectSheet(style)(withRouter(Root));