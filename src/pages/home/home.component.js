import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Row, Col, Card } from 'antd';
import QueueAnim from 'rc-queue-anim';

import * as backgrounds from '../../lib/help/ColorsVariables';
import style from './home.style';

import QuickLink from './components/quick-link.component';
import ArticleReader from './components/article-reader.component';
import Grow from './components/grow.component';

@inject('settings') @inject('loc') @observer
class Home extends Component {

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
    const locString = loc.strings.Home;
    const data = { grow: true, count: 122 };

    return (
      <div>

        <Row gutter={ 16 }>
          <QueueAnim duration={600}>
            <Col key="a" span={ 4 }><QuickLink linkTo="/#/articles/new" icon="edit" background={ backgrounds.PurpleColor } label={ locString.words.New_Article } /></Col>
            <Col key="b" span={ 4 }><QuickLink linkTo="/#/management/users" icon="user" background={ backgrounds.RedBloodColor } label={ locString.words.Users_Manager } /></Col>
            <Col key="c" span={ 4 }><QuickLink linkTo="/#/" icon="home" background={ backgrounds.BlueLightColor } label="Lorem ipsum" /></Col>
            <Col key="d" span={ 4 }><QuickLink linkTo="/#/" icon="home" background={ backgrounds.GreenBlueLightColor } label="Lorem ipsum" /></Col>
            <Col key="e" span={ 4 }><QuickLink linkTo="/#/" icon="home" background={ backgrounds.YellowDarkColor } label="Lorem ipsum" /></Col>
            <Col key="f" span={ 4 }><QuickLink linkTo="/#/" icon="home" background={ backgrounds.DeepOrangeColor } label="Lorem ipsum" /></Col>
          </QueueAnim>
        </Row>
        <Row>
          <Card>
            <Col span={ 12 }>
              <ArticleReader />
            </Col>
            <Col span={ 12 }>
              <Row gutter={ 6 }>
                <Col span={ 6 }><Grow data={ data } name="Lorem" /></Col>
                <Col span={ 6 }><Grow data={ data } name="Ipsum" /></Col>
                <Col span={ 6 }><Grow data={ data } name="Dolor" /></Col>
                <Col span={ 6 }><Grow data={ data } name="Sit" /></Col>
              </Row>
            </Col>
          </Card>
        </Row>
      </div>
    );
  }
}

export default injectSheet(style)(Home);