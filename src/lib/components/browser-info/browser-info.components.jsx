import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'antd';

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
  },
};

@inject(['loc']) @observer
class BrowserInfo extends Component {
  constructor() {
    super();
    this.url = 'https://ipapi.co/json/';
  }
  state = {
    data: []
  }

  componentDidMount() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data })
      })
      .catch(error => console.error(error));
  };

  render() {
    const { loc, classes } = this.props;
    const locString = loc.strings.Components.Browser_Info;
    const { data } = this.state;

    const ip = data.ip;

    return (
      <div>
        <Row>
          <Col>
            <Row>
              <Col span={12}><p className={classes.headText}>{locString.Ip_Address}:</p></Col>
              <Col span={12}>{ip}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default injectSheet(style)(BrowserInfo);