import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Layout, Row, Col, Menu, Icon, Dropdown, message  } from 'antd';
import { inject, observer } from 'mobx-react';
import Flag from 'react-world-flags';
import { Avatar } from 'antd';

import firebase from '../../../../lib/api/config.api';

const { Header } = Layout;
const style = {
  userAvatar: {
    background: '#333333',
    cursor: 'pointer',
    '& i': {
      fontSize: '24px!important'
    }
  },
  customIcon: {
    margin: '4px 8px'
  },

  email: {
    color: '#001529', 
    marginRight: '14px', 
    textAlign: 'center', 
    fontSize: '16px',
    marginTop: '4px'
  },

  logo: {
    textAlign: 'left',
    color: '#333333',
    fontSize: '23px',
    fontWeight: 'bold'
  }
}

@inject(['loc']) @observer
class TopBarComponent extends Component {

  handleLogout = async () => {
    const locStringsGlobal = this.props.loc.strings.Global;
    const hide = message.loading(locStringsGlobal.Logging_Off);

    try {
      await firebase.auth().signOut();
      message.success(locStringsGlobal.sentences.User_Was_Logout);
    } catch(err) {
      message.error(err.message);
    } finally {
      hide();
    }
  };

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  }

  render() {
    const { loc, classes, uid } = this.props;
    const locStringsGlobal = loc.strings.Global;
    console.log(uid);
    const menu = (
      <Menu>
        <Menu.Item>
          <div><Icon type="setting" className={classes.customIcon} /> {locStringsGlobal.Settings}</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.handleLogout}><Icon type="logout" className={classes.customIcon} /> {locStringsGlobal.Logout}</div>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Row>
          <Col span={8}></Col>
          <Col span={8}></Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <div style={{ marginRight: '16px' }}>
              <Flag onClick={() => loc.setLang('cs', () => this.setState({}))} style={{ marginRight: '7px', cursor: 'pointer' }} code="CZ" height="16" />
              <Flag onClick={() => loc.setLang('en', () => this.setState({}))} style={{ marginRight: '14px', cursor: 'pointer' }} code="GB" height="16" />
              <Dropdown overlay={menu}>
                <Avatar icon="user" />
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default injectSheet(style)(TopBarComponent);