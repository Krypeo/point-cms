import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Col, Card, Form, Icon, Input, Button, message, Row, Modal } from 'antd';
import Flag from 'react-world-flags';
import Texty from 'rc-texty';

import firebase from '../../lib/api/config.api';
import { currentDate, currentTime } from '../../lib/help/Formatter';

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
    this.browserInfoUrl = 'https://ipapi.co/json/';
    this.LoginLogsApi = 'LoginLogs';
    extendObservable(this, {
      username: '',
      password: '',
      redirect: false
    })
  }
  state = {
    forgetPasswordModal: false,
    forgetEmail: '',
    browserData: [],
    anim: false
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this[id] = value;
  }

  loginSuccessChecker = async () => {
    const { browserData } = this.state;
    const username = this.username;
    const date = currentDate();
    const time = currentTime();

    let browserInfo = {
      IpAddress: browserData.ip,
      City: browserData.city
    };
    browserInfo = { ...browserInfo, Username: username, Date: date, Time: time, Success: true }
    try {
      await firebase.database().ref(this.LoginLogsApi).push(browserInfo)
    } catch (err) {
      console.error(err);
      message.error(err.message);
    }
  }
  loginFailChecker = async () => {
    const { browserData } = this.state;
    const username = this.username;
    const date = currentDate();
    const time = currentTime();

    let browserInfo = {
      IpAddress: browserData.ip,
      City: browserData.city
    };
    browserInfo = { ...browserInfo, Username: username, Date: date, Time: time, Success: false }
    try {
      await firebase.database().ref(this.LoginLogsApi).push(browserInfo)
    } catch (err) {
      console.error(err);
      message.error(err.message);
    }
  }

  handleLogin = async () => {
    const username = this.username;
    const password = this.password;
    const locStrings = this.props.loc.strings.Login;

    if (username.length <= 1 || password.length <= 1) {
      message.error(locStrings.sentences.Empty_Email_Or_Password);
    } else {
      try {
        message.loading(locStrings.words.Logging_On);
        await firebase.auth().signInWithEmailAndPassword(this.username, this.password);
        message.success(locStrings.sentences.User_Was_Login);
        this.loginSuccessChecker()
      } catch (err) {
        console.error(err);
        message.error(locStrings.sentences.Please_Check_The_Login, 10);
        this.loginFailChecker();
      }
    }
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
    } catch (err) {
      message.error(err.message);
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
    setTimeout(() => {
      this.setState({ anim: true })
    }, 2000)
    fetch(this.browserInfoUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ browserData: data })
      })
      .catch(error => console.error(error));
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  }

  render() {
    const { classes, loc } = this.props;
    const { anim } = this.state;
    const locString = loc.strings.Login;
    const locStringGlobal = loc.strings.Global;

    return (
      <div style={ { background: '#001529', width: '100%', height: '100vh' } }>
        <Col xs={ { span: 24 } } sm={ { span: 16, push: 4 } } md={ { span: 12, push: 6 } } lg={ { span: 8, push: 8 } } xl={ { span: 6, push: 9 } } >
          <h1 style={ { color: '#FFFFFF', textAlign: 'center', marginTop: '50px' } }>
            { anim ?  <Texty delay={400} mode="random" type="scale">Point CMS</Texty> : <span>Point CMS</span> }
          </h1>
          <Card title={ locString.sentences.Administration_Login } className={ classes.card }>
            <Form>
              <Form.Item>
                <Input
                  id="username"
                  type="email"
                  onChange={ this.handleChange }
                  prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                  placeholder={ locStringGlobal.Email }
                  onPressEnter={ () => this.passwordInput.focus() }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  id="password"
                  ref={ ref => this.passwordInput = ref }
                  onChange={ this.handleChange }
                  prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                  type="password"
                  placeholder={ locStringGlobal.Password }
                  onPressEnter={ this.handleLogin }
                />
              </Form.Item>
              <Form.Item style={ { marginBottom: 0 } }>
                <Button
                  type="primary"
                  onClick={ this.handleLogin }
                  style={ { width: '100%' } }
                >
                  { locString.words.Login }
                </Button>
              </Form.Item>
              <Row>
                <Col span={ 12 } style={ { marginTop: '13px' } }>
                  <Flag onClick={ () => loc.setLang('cs', () => this.setState({})) } style={ { marginRight: '7px', cursor: 'pointer' } } code="CZ" height="16" />
                  <Flag onClick={ () => loc.setLang('en', () => this.setState({})) } style={ { marginRight: '14px', cursor: 'pointer' } } code="GB" height="16" />
                </Col>
                <Col span={ 12 } className={ classes.lostPassword }>
                  <Button onClick={ this.handleShowLostPasswordModal } size="small" type="dashed">{ locString.words.Forget_Password }</Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Modal
          title={ locString.sentences.Reset_Forget_Password }
          visible={ this.state.forgetPasswordModal }
          onOk={ this.handleSendNewPasswordOnEmail }
          onCancel={ this.handleShowLostPasswordModal }
          okText={ locStringGlobal.Send }
        >
          <Input
            placeholder={ locStringGlobal.Email }
            prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
            value={ this.state.forgetEmail }
            onChange={ (e) => this.onChangeForgetEmail(e) }
            type="email"
          />
        </Modal>
      </div>
    )
  }
}

export default injectSheet(style)(Login);