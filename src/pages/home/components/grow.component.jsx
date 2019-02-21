import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Card, Row, Col, Icon } from 'antd';

const style = {
  arrow: {
    fontSize: '40px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  name: {
    color: '#333333',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '0',
    margin: '0',
    marginTop: '7px'
  },
  count: {
    color: '#9F9F9F'
  }
};

class Grow extends Component {
  render() {
    const { classes, name } = this.props;
    const { grow, count } = this.props.data;

    return (
      <Card bodyStyle={{ padding: '7px' }}>
        <Row>
          <Col span={10}>
            <div className={classes.arrow} style={{ color: grow ? 'green' : 'red' }}>
              {grow ? (<Icon type="arrow-up" />) : <Icon type="arrow-down" />}
            </div>
          </Col>
          <Col span={14}>
            <Row><p className={classes.name}>{name}</p></Row>
            <Row><span className={classes.count}>{count}</span></Row>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default injectSheet(style)(Grow);