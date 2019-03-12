import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';

const style = {
  mainView: {
    background: 'rgb(0, 21, 41)',
    width: '100%',
    height: '100vh',
    textAlign: 'center'
  },
  loadingIcon: {
    fontSize: '50px',
    color: '#FAFAFA',
    marginTop: 'calc(50vh - 17px)'
  },
  loadingText: {
    fontSize: '17px',
    color: '#FAFAFA',
    marginTop: '14px'
  }
};

@inject('settings') @inject('loc') @observer
class Loading extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainView}>
        <Icon className={classes.loadingIcon} type="loading" />
        <p className={classes.loadingText}>Loading...</p>
      </div>
    )
  }
}

export default injectSheet(style)(Loading);