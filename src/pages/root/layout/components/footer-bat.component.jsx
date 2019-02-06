import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Layout } from 'antd';

const { Footer } = Layout;
const style = [];

class FooterComponent extends PureComponent {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Point CMS ©2019 Created by Lukas Kaleta
      </Footer>
    );
  }
}

export default injectSheet(style)(FooterComponent);