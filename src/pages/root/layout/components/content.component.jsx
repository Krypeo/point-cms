import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Layout } from 'antd';

const { Content } = Layout;
const style = [];

class ContentComponent extends PureComponent {
  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          Bill is a cat.
            </div>
      </Content>
    );
  }
}

export default injectSheet(style)(ContentComponent);