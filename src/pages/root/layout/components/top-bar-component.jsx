import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Layout } from 'antd';

const { Header } = Layout;
const style = [];

class TopBarComponent extends PureComponent {

  render() {

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        Tohle je header
      </Header>
    );
  }
}

export default injectSheet(style)(TopBarComponent);