import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';

// import store from './management.store';
import style from './management.style';
// import { columns } from './management.columns';

@inject('loc') @inject('settings') @observer
class Management extends Component {
  render() {
    return (
      <div>Aloha!</div>
    );
  };
};

export default injectSheet(style)(Management);