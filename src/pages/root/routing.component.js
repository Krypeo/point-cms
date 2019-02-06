import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import Home_Component from '../home/home.component';

import Users_Component from '../management/users/users.component';

@observer
class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home_Component} />

        <Route path="/home" exact component={Home_Component} />

        <Route path="/users" exact component={Users_Component} />
      </Switch>
    )
  }
}

export default withRouter(Routing);