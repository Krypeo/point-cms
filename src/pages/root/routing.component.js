import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import NotFound from './not-found.component';
import Login_Component from './login.component';

import Home_Component from '../home/home.component';

import Users_Component from '../management/users/users.component';
import Languages_Component from '../management/languages/languages.component';
import Categories_Component from '../management/categories/categories.component';

import Overview_Component from '../articles/overview/overview.component';
import New_Component from '../articles/new/new.component';

@observer
class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home_Component} />
        <Route path="/login" exact component={Login_Component} />

        <Route path="/management/users" exact component={Users_Component} />
        <Route path="/management/languages" exact component={Languages_Component} />
        <Route path="/management/categories" exact component={Categories_Component} />

        <Route path="/articles/overview" exact component={Overview_Component} />
        <Route path="/articles/new" exact component={New_Component} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default withRouter(Routing);