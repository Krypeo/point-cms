import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Modal } from 'antd';

const style = [];

class EditModal extends Component {

  render() {
    const { showEdit } = this.props;

    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={showEdit}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}

export default injectSheet(style)(EditModal);