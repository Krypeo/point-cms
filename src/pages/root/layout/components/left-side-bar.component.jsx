import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Layout, Menu, Icon, } from 'antd';
import { inject, observer } from 'mobx-react';

const { SubMenu } = Menu;
const { Sider } = Layout;
const style = [];

@inject('loc') @observer
class LeftSideBarComponent extends Component {
  state = {
    hide: false,
  };

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  }

  handleHide = (hide) => {
    this.setState({ hide });
  }
  render() {
    const { loc } = this.props;
    const locStringMenu = loc.strings.Menu;
    // /articles/overview-articles

    return (
      <Sider
        collapsible
        collapsed={this.state.hide}
        onCollapse={this.handleHide}
      >
        <div>
          <h1 style={{ color: '#FFFFFF', textAlign: 'center' }}>Point CMS</h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline">

          <Menu.Item key="home"><a href="/#/"><Icon type="home" /><span>{locStringMenu.Home}</span></a></Menu.Item>

          <SubMenu key="management" title={<span><Icon type="tool" /><span>{locStringMenu.Management.Name}</span></span>}>
            <Menu.Item key="management-users">{<a href="/#/management/users">{locStringMenu.Management.User_Management}</a>}</Menu.Item>
            <Menu.Item key="management-languages">{<a href="/#/management/languages">{locStringMenu.Management.Language_Management}</a>}</Menu.Item>
            <Menu.Item key="management-categories">{<a href="/#/management/categories">{locStringMenu.Management.Categories_Management}</a>}</Menu.Item>
          </SubMenu>

          <SubMenu key="articles" title={<span><Icon type="read" /><span>{locStringMenu.Articles.Name}</span></span>}>
            <Menu.Item key="articles-overview">{<a href="/#/articles/overview">{locStringMenu.Articles.Overview_Articles}</a>}</Menu.Item>
            <Menu.Item key="articles-new">{<a href="/#/articles/new">{locStringMenu.Articles.New_Articles}</a>}</Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>
    );
  }
}

export default injectSheet(style)(LeftSideBarComponent);