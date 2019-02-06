import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Layout } from 'antd';

import LeftSideBarComponent from './components/left-side-bar.component';
import TopBarComponent from './components/top-bar-component';
import ContentComponent from './components/content.component';
import FooterComponent from './components/footer-bat.component';
import BreadcrumbComponent from './components/breadcrumb-component';

const style = [];

class MainLayout extends Component {

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <LeftSideBarComponent />
        <Layout>
          <TopBarComponent />
          <BreadcrumbComponent />
          <ContentComponent />
          <FooterComponent />
        </Layout>
      </Layout>
    );
  }
}

export default injectSheet(style)(MainLayout);