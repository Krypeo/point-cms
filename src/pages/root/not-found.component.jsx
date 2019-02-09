import React, { Component } from 'react';
import injectSheet from 'react-jss';

const style = [];

class NotFound extends Component {
  render() {
    return (
      <div>
        Error 404!
      </div>
    )
  }
}

export default injectSheet(style)(NotFound);