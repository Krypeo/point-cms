import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const style = {};

@inject('settings') @inject('loc') @observer
class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
  };
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  };

  render() {
    console.log(this.state.text);

    return (
      <ReactQuill
        value={this.state.text}
        onChange={this.handleChange}
        theme='snow'
      />
    )
  }
}

export default injectSheet(style)(Editor);