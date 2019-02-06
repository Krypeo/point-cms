import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import Root_Component from './root.component';

import Home_Component from '../home/home.component';

@observer
class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Root_Component} />

        <Route path="/home" exact component={Home_Component} />
      </Switch>
    )
  }
}

export default withRouter(Routing);