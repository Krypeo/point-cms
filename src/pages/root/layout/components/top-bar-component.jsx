import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Layout, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';
import Flag from 'react-world-flags';
import { Avatar } from 'antd';

const { Header } = Layout;
const style = [];

@inject([ 'loc' ]) @observer
class TopBarComponent extends Component {

  componentDidMount() {
		this.mounted = true;
		this.props.loc.subscribe(this);
	}
	componentWillUnmount() {
		this.mounted = false;
		this.props.loc.unsubscribe(this);
	}

  render() {
    const { loc } = this.props;

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Row>
          <Col span={8}></Col>
          <Col span={8}></Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <div style={{ marginRight: '16px' }}>
              <Flag onClick={() => loc.setLang('cs', () => this.setState({}))} style={{ marginRight: '7px', cursor: 'pointer' }} code="CZ" height="16" />
              <Flag onClick={() => loc.setLang('en', () => this.setState({}))} style={{ marginRight: '14px', cursor: 'pointer' }} code="GB" height="16" />
              <Avatar icon="user" />
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default injectSheet(style)(TopBarComponent);