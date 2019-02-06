import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Layout, Menu, Icon, } from 'antd';
import { observer } from 'mobx-react';

const { SubMenu } = Menu;
const { Sider } = Layout;
const style = [];

@observer
class LeftSideBarComponent extends Component {
  state = {
    hide: false,
  };

  handleHide = (hide) => {
    this.setState({ hide });
  }
  render() {

    return (
      <Sider
        collapsible
        collapsed={this.state.hide}
        onCollapse={this.handleHide}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <a href="/#/home"><Icon type="home" /><span>Home</span></a>
          </Menu.Item>
          <SubMenu
            key="management"
            title={<span><Icon type="user" /><span>Management</span></span>}
          >
            <Menu.Item key="3">{<a href="/#/users">Users</a>}</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default injectSheet(style)(LeftSideBarComponent);