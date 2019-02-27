import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Card, Row, Col } from 'antd';
import Axios from 'axios';

const style = {};

class SmogSituation extends Component {
  constructor() {
    super();
    this.url = 'https://cors-anywhere.herokuapp.com/http://portal.chmi.cz/files/portal/docs/uoco/web_generator/aqindex_cze.json';
  }
  state = {
    data: []
  }

  componentDidMount() {
    const smog = async () => {
      await Axios.get(this.url)
        .then(response => {
          this.setState({ data: response.data })
        })
    }
    smog();
  };

  render() {
    const { data } = this.state;
    const color = data.Legend === undefined ? '#FFFFFF' : `#${data.Legend[0].Color}`;
    const state = data.Legend === undefined ? 'Nacitam...' : data.Legend[0].Description;

    return (
      <Card title="Ostatni data">
        <Row>
          <Col span={12}><div style={{ background: color, width: '100%', padding: '10px' }}>{state}</div></Col>
        </Row>
      </Card>
    )
  }
}

export default injectSheet(style)(SmogSituation);