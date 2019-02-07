import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Table, message } from 'antd';

import style from './languages.style';
import store from './languages.store';
import { columns } from './languages.columns';

import EditModal from './components/edit-modal.component';

@inject('settings') @observer
class Languages extends Component {
  state = {
    showEdit: false
  }

  handleTableChange = () => {
    store.refresh();
  };

  handleInsert = () => {
    const data = {
      Name: 'login',
      Cs_CZ: 'Přihlásit',
      En_EN: 'Login'
    }
    try {
      store.insert(data);
      message.success('Zaznam byl pridan');
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    store.refresh();
  }

  render() {
    const { classes } = this.props;
    const { showEdit } = this.state;

    return (
      <div>
        <EditModal showEdit={showEdit} />
        <Table
          dataSource={store.fullData}
          columns={columns(this, classes)}
          loading={store.loading}
          size={this.props.settings.tableSize}
          onChange={this.handleTableChange}
          key={row => row.key}
        />
      </div>
    );
  }
}

export default injectSheet(style)(Languages);