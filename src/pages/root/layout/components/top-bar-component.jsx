import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Layout } from 'antd';
import { observer } from 'mobx-react';

const { Header } = Layout;
const style = [];

@observer
class TopBarComponent extends Component {

  render() {

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        Tohle je header
      </Header>
    );
  }
}

export default injectSheet(style)(TopBarComponent);