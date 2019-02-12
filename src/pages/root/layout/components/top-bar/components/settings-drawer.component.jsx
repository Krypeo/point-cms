import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import { Drawer, Card, Row, Col, Avatar } from 'antd';

const style = {
  text: {
    fontWeight: '400',
    display: 'inlineBlock',
    fontSize: '14px',
    color: 'rgba(0,0,0,0.85)',
    marginBottom: '7px'
  },
  headText: {
    fontWeight: 'bold',
    display: 'inlineBlock',
    fontSize: '14px',
    color: 'rgba(0,0,0,0.85)',
    marginBottom: '7px'
  }
};

@inject(['loc']) @observer
class SettingsDrawer extends Component {

  render() {
    const { classes, drawer, close, userData, loc } = this.props;
    const locString = loc.strings.Layout.Settings;
    const userAvatar = userData ? userData.Avatar : '';
    const userName = userData ? userData.Name : '';
    const userSurname = userData ? userData.Surname : '';
    const userEmail = userData ? userData.Email : '';

    return (
      <div>
        <Drawer
          title={locString.headers.Settings}
          placement="right"
          closable={false}
          onClose={close}
          visible={drawer}
          width={400}
        >
          <Row>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}><Avatar size={256} src={userAvatar} /></div>
          </Row>
          <Card size="small" title={locString.headers.Info_About_User}>
            <Row>
              <Col span={12}><p className={classes.headText}>{locString.label.Name_Surname}</p></Col>
              <Col span={12}><p className={classes.text}>{`${userName} ${userSurname}`}</p></Col>
            </Row>
            <Row>
              <Col span={12}><p className={classes.headText}>{locString.label.Email}</p></Col>
              <Col span={12}><p className={classes.text}>{userEmail}</p></Col>
            </Row>
          </Card>
          <Card style={{ marginTop: '28px' }} size="small" title={locString.headers.Environment_Settings}>
            <Row>
              <p>Doplnit</p>
            </Row>
          </Card>
        </Drawer>
      </div>
    )
  }
}

export default injectSheet(style)(SettingsDrawer);