import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import { Drawer, Card, Row, Col, Avatar, Input, message } from 'antd';

import style from './settings.drawer.style';
import store from './settings-drawer.store';

@inject(['loc']) @observer
class SettingsDrawer extends Component {
  state = {
    ChangesDisabled: false,
    User: '',
    Email: ''
  }

  handleAboutChange = () => {
    const { ChangesDisabled } = this.state;
    if (ChangesDisabled) {
      this.setState({ ChangesDisabled: false })
    } else {
      this.setState({ ChangesDisabled: true })
    }
  };

  generateExtra = () => {
    const { userData, loc, classes } = this.props;
    const { ChangesDisabled } = this.state;
    const locStringGlobal = loc.strings.Global;
    const uid = userData ? userData.key : '';

    if (ChangesDisabled) {
      return (<div onClick={() => this.handleChangeDone(uid)} className={classes.extraTextDone}>{locStringGlobal.Done}</div>);
    } else {
      return (<div onClick={() => this.handleAboutChange()} className={classes.extraText}>{locStringGlobal.Change}</div>);
    }
  };

  generateInputs = () => {
    const { ChangesDisabled } = this.state;
    const { classes, userData } = this.props;

    const userName = userData ? userData.Name : '';
    const userSurname = userData ? userData.Surname : '';
    const userEmail = userData ? userData.Email : '';

    let element = [
      (<p className={classes.text}>{`${userName} ${userSurname}`}</p>),
      (<p className={classes.text}>{userEmail}</p>)
    ];

    if (ChangesDisabled) {
      element = [
        (<Input id="User" onChange={(e) => this.handleChange(e)} size="small" placeholder={`${userName} ${userSurname}`} />),
        (<Input id="Email" onChange={(e) => this.handleChange(e)} size="small" placeholder={userEmail} />)
      ]
    }
    return element;
  };

  handleChangeDone = async (uid) => {
    const { User, Email } = this.state;
    const { loc, refs } = this.props;
    const locStringGlobal = loc.strings.Global;

    const Name = User.split(' ')[0];
    const Surname = User.split(' ')[1];
    const send = { Name: Name, Surname: Surname, Email: Email }
        
    try {
      await store.update(uid, send);
      message.success(locStringGlobal.Sent);
      refs.handleRefresh();
      this.setState({ User: '', Email: '', ChangesDisabled: false });
    } catch (err) {
      console.error(err.message);
      message.error(err.message)
    }
  };

  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    this.setState({ [id]: value })
  };

  render() {
    const { classes, drawer, close, userData, loc } = this.props;
    const locString = loc.strings.Layout.Settings;
    const inputs = this.generateInputs();

    const userAvatar = userData ? userData.Avatar : '';

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
            <div style={{ textAlign: 'center', marginBottom: '28px', position: 'relative' }}>
              <Avatar size={256} src={userAvatar} />
            </div>
          </Row>
          <Card
            size="small"
            extra={this.generateExtra()}
            title={locString.headers.Info_About_User}>
            <Row>
              <Col span={12}><p className={classes.headText}>{locString.label.Name_Surname}</p></Col>
              <Col span={12}>{inputs[0]}</Col>
            </Row>
            <Row>
              <Col span={12}><p className={classes.headText}>{locString.label.Email}</p></Col>
              <Col span={12}>{inputs[1]}</Col>
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