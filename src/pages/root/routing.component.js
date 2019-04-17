import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
// SYSTEM
import NotFound from './not-found.component';
// ROOT
import Login_Component from './login.component';
import Home_Component from '../home/home.component';
// PAGES
import Pages_AllPagesComponent from '../pages/all-pages/all-pages.component';
// MANAGEMENT
import Users_Component from '../management/users/users.component';
import UserRoles_Component from '../management/user-roles/user-roles.component';
import Languages_Component from '../management/languages/languages.component';
import Categories_Component from '../management/categories/categories.component';
// ARTICLES
import Overview_Component from '../articles/overview/overview.component';
import New_Component from '../articles/new/new.component';
// LOGS
import LoginLogs_Component from '../logs/login-logs/login-logs.component';
// QUESTIONNAIRES
import QuestionnairesOverview_Component from '../questionnaires/questionnaires-overview/questionnaires-overview.component';

@observer
class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Home_Component } />
        <Route path="/login" exact component={ Login_Component } />

        <Route path="/pages/all-pages" exact component={ Pages_AllPagesComponent } />

        <Route path="/management/users" exact component={ Users_Component } />
        <Route path="/management/user-roles" exact component={ UserRoles_Component } />
        <Route path="/management/languages" exact component={ Languages_Component } />
        <Route path="/management/categories" exact component={ Categories_Component } />

        <Route path="/articles/overview" exact component={ Overview_Component } />
        <Route path="/articles/new" exact component={ New_Component } />

        <Route path="/logs/login" exact component={ LoginLogs_Component } />

        <Route path="/questionnaires/overview" exact component={ QuestionnairesOverview_Component } />

        <Route component={ NotFound } />
      </Switch>
    )
  }
}

export default withRouter(Routing);