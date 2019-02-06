import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';

import style from './home.style';

@observer @inject('settings')
class Home extends Component {
  render() {
    console.log(this.props);

    return(
      <div>Hello Home</div>
    );
  }
}

export default injectSheet(style)(Home);