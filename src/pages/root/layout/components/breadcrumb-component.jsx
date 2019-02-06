import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Breadcrumb, Icon } from 'antd';
import { observer } from 'mobx-react';

const style = [];

@observer
class BreadcrumbComponent extends Component {
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