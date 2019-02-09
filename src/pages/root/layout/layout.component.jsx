import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Layout } from 'antd';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import LeftSideBarComponent from './components/left-side-bar.component';
import TopBarComponent from './components/top-bar-component';
import FooterComponent from './components/footer-bat.component';
import Routing from '../routing.component';

const { Content } = Layout;
const style = [];

@observer
class MainLayout extends Component {

  render() {
    const { uid } = this.props;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <LeftSideBarComponent />
        <Layout>
          <TopBarComponent uid={uid} />
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Routing />
            </div>
          </Content>
          <FooterComponent />
        </Layout>
      </Layout>
    );
  }
}

export default injectSheet(style)(withRouter(MainLayout));