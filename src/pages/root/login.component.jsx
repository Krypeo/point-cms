import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { extendObservable } from 'mobx';
import { Col, Card, Form, Icon, Input, Button, message, Row } from 'antd';
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


class Login extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      username: '',
      password: '',
      redirect: false
    })
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this[id] = value;
  }

  handleSubmit = () => {
    const hide = message.loading('Přihlášuji...')
    firebase.auth().signInWithEmailAndPassword(this.username, this.password).then((data) => {
      hide();
      if (data.user != null) {
        message.success('Příhlášení proběhlo v pořádku.')
      }
    }).catch(function (error) {
      message.error(error.message)
    });
  }

  lostPassword = () => {
    console.log('Ready to do...'); // TODO Dodelat ztracene heslo
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ background: '#001529', width: '100%', height: '100vh' }}>
        <Col xs={{ span: 24 }} sm={{ span: 16, push: 4 }} md={{ span: 12, push: 6 }} lg={{ span: 8, push: 8 }} xl={{ span: 6, push: 9 }} >
          <h1 style={{ color: '#FFFFFF', textAlign: 'center', marginTop: '50px' }}>Point CMS</h1>
          <Card title={"Přihlášení do administrace"} className={classes.card}>
            <Form>
              <Form.Item>
                <Input
                  id="username"
                  type="email"
                  onChange={this.handleChange}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder={"Email"}
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
                  placeholder={"Heslo"}
                  onPressEnter={this.handleSubmit}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  style={{ width: '100%' }}
                >
                  Přihlásit
                  </Button>
              </Form.Item>
              <Row>
                <Col span={12}></Col>
                <Col span={12} className={classes.lostPassword}><div onClick={this.lostPassword}>Zapomenuté heslo</div></Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </div>
    )
  }
}

export default injectSheet(style)(Login);