import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Layout } from 'antd';
import { observer } from 'mobx-react';

const { Footer } = Layout;
const style = [];

@observer
class FooterComponent extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Point CMS ©2019 Created by Lukáš Kaleta
      </Footer>
    );
  }
}

export default injectSheet(style)(FooterComponent);