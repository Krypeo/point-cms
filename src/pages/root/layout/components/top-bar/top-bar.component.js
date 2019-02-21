import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Layout, Row, Col, Menu, Icon, Dropdown, message } from 'antd';
import { inject, observer } from 'mobx-react';
import Flag from 'react-world-flags';
import { Avatar } from 'antd';

import firebase from '../../../../../lib/api/config.api';
import SettingsDrawerComponent from './components/settings-drawer.component';
import style from './top-bar.style';
import store from './top-bar.store';
import { randomColor } from '../../../../../lib/help/GlobalFunctions';

const { Header } = Layout;

@inject(['loc']) @observer
class TopBarComponent extends Component {
  state = {
    drawer: false
  }

  handleSettings = () => {
    this.setState({
      drawer: true
    })
  };

  handleCloseSettings = () => {
    this.setState({
      drawer: false
    })
  }

  handleLogout = async () => {
    const locStringsGlobal = this.props.loc.strings.Global;
    const hide = message.loading(locStringsGlobal.Logging_Off);

    try {
      await firebase.auth().signOut();
      message.success(locStringsGlobal.sentences.User_Was_Logout);
    } catch (err) {
      message.error(err.message);
    } finally {
      hide();
    }
  };

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
    store.refresh();
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  }

  render() {
    const { loc, classes, uid } = this.props;
    const { drawer } = this.state;
    const locStringsGlobal = loc.strings.Global;
    const users = store.fullData;
    const userData = users.find(item => item.Uid === uid);
    const userAvatar = userData ? userData.Avatar : '';
    const userName = userData ? userData.Name : '';

    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={this.handleSettings}><Icon type="setting" className={classes.customIcon} /> {locStringsGlobal.Settings}</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.handleLogout}><Icon type="logout" className={classes.customIcon} /> {locStringsGlobal.Logout}</div>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <SettingsDrawerComponent drawer={drawer} close={this.handleCloseSettings} userData={userData} />
        <Row>
          <Col span={8}></Col>
          <Col span={8}></Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <div style={{ marginRight: '16px' }}>
              <Flag onClick={() => loc.setLang('cs', () => this.setState({}))} style={{ marginRight: '7px', cursor: 'pointer' }} code="CZ" height="16" />
              <Flag onClick={() => loc.setLang('en', () => this.setState({}))} style={{ marginRight: '14px', cursor: 'pointer' }} code="GB" height="16" />
              <Dropdown overlay={menu}>
                { userAvatar
                  ? <Avatar size="large" src={userAvatar} />
                  : <Avatar style={{ backgroundColor: randomColor() }} size="large">{userName[0]}</Avatar>
                }
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default injectSheet(style)(TopBarComponent);