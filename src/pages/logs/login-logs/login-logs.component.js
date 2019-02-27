import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Card } from 'antd';

// import store from './login-logs.store';
import style from './login-logs.style';

class LoginLogs extends Component {
  render() {
    return (
      <Card>Login logs</Card>
    )
  }
}

export default injectSheet(style)(LoginLogs);