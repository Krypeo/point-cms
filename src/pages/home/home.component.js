import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Row, Col, Card } from 'antd';


import { NewArticleColor, UsersManagerColor } from '../../lib/help/ColorsVariables';
import style from './home.style';

import QuickLink from './components/quick-link.component';
import ArticleReader from './components/article-reader.component';
import Grow from './components/grow.component';

@inject('settings') @inject('loc') @observer
class Home extends Component {

  render() {
    const { loc } = this.props;
    const locString = loc.strings.Home;
    const data = { grow: true, count: 122 };

    return (
      <div>
        <Row gutter={16}>
          <Col span={4}><QuickLink linkTo="/#/articles/new" icon="edit" background={NewArticleColor} label={locString.words.New_Article} /></Col>
          <Col span={4}><QuickLink linkTo="/#/management/users" icon="user" background={UsersManagerColor} label={locString.words.Users_Manager} /></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
        </Row>
        <Row>
          <Card>
            <Col span={12}>
              <ArticleReader />
            </Col>
            <Col span={12}>
              <Row gutter={6}>
                <Col span={6}><Grow data={data} name="Lorem" /></Col>
                <Col span={6}><Grow data={data} name="Ipsum" /></Col>
                <Col span={6}><Grow data={data} name="Dolor" /></Col>
                <Col span={6}><Grow data={data} name="Sit" /></Col>
              </Row>
            </Col>
          </Card>
        </Row>
      </div>
    );
  }
}

export default injectSheet(style)(Home);