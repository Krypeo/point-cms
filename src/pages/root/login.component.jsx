import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Col, Card, Form, Icon, Input, Button, message, Row, Modal } from 'antd';
import Flag from 'react-world-flags';

import firebase from '../../lib/api/config.api';

const style = {
  card: {
    marginTop: '50px'
  },
  lostPassword: {
    textAlign: 'right',
    marginTop: '14px',
    textDecoration: 'underline',
    fontSize: '12px'
  }
};

@inject(['loc']) @observer
class Login extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      username: '',
      password: '',
      redirect: false
    })
  }
  state = {
    forgetPasswordModal: false,
    forgetEmail: ''
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this[id] = value;
  }

  handleLogin = async () => {
    const locStrings = this.props.loc.strings.Login;
    const hide = message.loading(locStrings.words.Logging_On);

    try {
      await firebase.auth().signInWithEmailAndPassword(this.username, this.password);
      message.success(locStrings.sentences.User_Was_Login);
    } catch (err) {
      console.error(err);
      message.error(locStrings.sentences.Please_Check_The_Login, 10);
    } finally {
      hide()
    };
  }

  handleShowLostPasswordModal = () => {
    const { forgetPasswordModal } = this.state;
    if (forgetPasswordModal) {
      this.setState({
        forgetPasswordModal: false
      })
    } else {
      this.setState({
        forgetPasswordModal: true
      })
    }
  };
  onChangeForgetEmail = (e) => {
    this.setState({
      forgetEmail: e.target.value
    })
  };
  handleSendNewPasswordOnEmail = async () => {
    const { forgetEmail } = this.state;
    const locString = this.props.loc.strings.Login;

    try {
      await firebase.auth().sendPasswordResetEmail(forgetEmail).then(() => {
        message.success(locString.sentences.Password_Was_Send);
        this.setState({ forgetEmail: '' })
      })
    } catch(err) {
      message.error(err.message);
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  }

  render() {
    const { classes, loc } = this.props;
    const locString = loc.strings.Login;
    const locStringGlobal = loc.strings.Global;

    return (
      <div style={{ background: '#001529', width: '100%', height: '100vh' }}>
        <Col xs={{ span: 24 }} sm={{ span: 16, push: 4 }} md={{ span: 12, push: 6 }} lg={{ span: 8, push: 8 }} xl={{ span: 6, push: 9 }} >
          <h1 style={{ color: '#FFFFFF', textAlign: 'center', marginTop: '50px' }}>Point CMS</h1>
          <Card title={locString.sentences.Administration_Login} className={classes.card}>
            <Form>
              <Form.Item>
                <Input
                  id="username"
                  type="email"
                  onChange={this.handleChange}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder={locStringGlobal.Email}
                  onPressEnter={() => this.passwordInput.focus()}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  id="password"
                  ref={ref => this.passwordInput = ref}
                  onChange={this.handleChange}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder={locStringGlobal.Password}
                  onPressEnter={this.handleLogin}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  onClick={this.handleLogin}
                  style={{ width: '100%' }}
                >
                  {locString.words.Login}
                </Button>
              </Form.Item>
              <Row>
                <Col span={12} style={{ marginTop: '13px' }}>
                  <Flag onClick={() => loc.setLang('cs', () => this.setState({}))} style={{ marginRight: '7px', cursor: 'pointer' }} code="CZ" height="16" />
                  <Flag onClick={() => loc.setLang('en', () => this.setState({}))} style={{ marginRight: '14px', cursor: 'pointer' }} code="GB" height="16" />
                </Col>
                <Col span={12} className={classes.lostPassword}>
                  <Button onClick={this.handleShowLostPasswordModal} size="small" type="dashed">{locString.words.Forget_Password}</Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Modal
          title={locString.sentences.Reset_Forget_Password}
          visible={this.state.forgetPasswordModal}
          onOk={this.handleSendNewPasswordOnEmail}
          onCancel={this.handleShowLostPasswordModal}
          okText={locStringGlobal.Send}
        >
          <Input
            placeholder={locStringGlobal.Email}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={this.state.forgetEmail}
            onChange={(e) => this.onChangeForgetEmail(e)}
            type="email"
          />
        </Modal>
      </div>
    )
  }
}

export default injectSheet(style)(Login);