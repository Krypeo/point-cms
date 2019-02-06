import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Root_Component from './root.component';

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Root_Component} />
      </Switch>
    )
  }
}

export default withRouter(Routing);