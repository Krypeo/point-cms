import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';

// import store from './all-pages.store';
import style from './all-pages.style';
// import { columns } from './all-pages.columns';

@inject('loc') @inject('settings') @observer
class AllPages extends Component {
  render() {
    return (
      <div>Aloha!</div>
    );
  };
};

export default injectSheet(style)(AllPages);