import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import Home_Component from '../home/home.component';

import Users_Component from '../management/users/users.component';
import Languages_Component from '../management/languages/languages.component';

@observer
class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home_Component} />
        <Route path="/home" exact component={Home_Component} />

        <Route path="/users" exact component={Users_Component} />
        <Route path="/languages" exact component={Languages_Component} />
      </Switch>
    )
  }
}

export default withRouter(Routing);