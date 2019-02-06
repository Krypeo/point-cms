import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Breadcrumb, Icon } from 'antd';

const style = [];

class BreadcrumbComponent extends PureComponent {
  render() {
    return (
      <Breadcrumb style={{ padding: '16px' }}>
        <Breadcrumb.Item href="">
          <Icon type="home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <Icon type="user" />
          <span>Application List</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Application
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default injectSheet(style)(BreadcrumbComponent);