import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Icon } from 'antd';

const style = {
  linkBox: {
    textAlign: 'right',
    minWidth: '230px',
    padding: '25px',
    marginBottom: '28px',
    color: '#333333',
    cursor: 'pointer',
    fontSize: '18px',
    borderRadius: '3px',
    boxShadow: '0px 5px 22px -3px rgba(0,0,0,0.33);',
    position: 'relative',
    transition: 'transform all .2s',
    border: '1px soli rgba(0, 0, 0, 0.65)'
  },

  linkIcon: {
    textAlign: 'left',
    fontSize: '37px',
    position: 'absolute',
    left: '25px',
    top: '10px'
  }
};

class QuickLink extends Component {

  linkTo = () => {
    const { linkTo } = this.props;

    const link = document.createElement('a');
    link.href = (linkTo);
    link.click();
  };

  render() {
    const { label, classes, background, icon } = this.props;

    return (
      <div onClick={this.linkTo} className={classes.linkBox} style={{ '&:hover':{ border: `1px solid ${background}` }}}>
        <span className={classes.linkIcon} style={{ color: background }}><Icon type={icon} /></span>
        {label}
      </div>
    )
  }
}

export default injectSheet(style)(QuickLink);