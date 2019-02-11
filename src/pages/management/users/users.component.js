import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Table, message } from 'antd';
import { ModularConfig, modularDialog, validators } from '@adler-it/reactant-modularis';

import style from './users.style';
import store from './users.store';
import { columns } from './users.columns';
import { singleTableHeader } from '../../../lib/help/GlobalVariables';

@inject('settings') @inject('loc') @observer
class Users extends Component {
  handleTableChange = () => {
    store.refresh();
  };

  handleInsert = () => {
    const locString = this.props.loc.strings.Management.Users_Management;
    const locStringGlobal = this.props.loc.strings.Global;
    const roles = store.roles.map(item => ({ value: item.Identifier, text: item.Role }));

    const config = new ModularConfig()
      .string({ key: 'Uid', label: 'Uid' })
      .string({ key: 'Avatar', label: locString.label.Avatar })
      .string({ key: 'Name', label: locString.label.Name, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .string({ key: 'Surname', label: locString.label.Surname, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .string({ key: 'Email', label: locString.label.Email, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .select({ key: 'Role', label: locString.label.Role, data: roles, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .switch({ key: 'ConfirmedEmail', label: locString.label.Confirmed_Email })
      .switch({ key: 'Active', label: locString.label.Active })

    modularDialog(locStringGlobal.Insert, config, '40%')
      .onResult(async (result, dialog) => {
        dialog.load();
        try {
          await store.insert(result);
          message.success(locStringGlobal.Inserted);
          dialog.close();
          store.refresh();
        } catch (err) {
          message.error(err);
          console.error(err);
        } finally {
          dialog.load(false);
        }
      })
  };

  handleEdit = (row) => {
    const locString = this.props.loc.strings.Management.Users_Management;
    const locStringGlobal = this.props.loc.strings.Global;
    const roles = store.roles.map(item => ({ value: item.Identifier, text: item.Role }));

    const config = new ModularConfig()
      .string({ key: 'Uid', label: 'Uid', defaultValue: row.Uid })
      .string({ key: 'Avatar', label: locString.label.Avatar, defaultValue: row.Avatar })
      .string({ key: 'Name', label: locString.label.Name, defaultValue: row.Name, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .string({ key: 'Surname', label: locString.label.Surname, defaultValue: row.Surname, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .string({ key: 'Email', label: locString.label.Email, defaultValue: row.Email, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .select({ key: 'Role', label: locString.label.Role, data: roles, defaultValue: row.Role, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .switch({ key: 'ConfirmedEmail', label: locString.label.Confirmed_Email, defaultValue: row.ConfirmedEmail })
      .switch({ key: 'Active', label: locString.label.Active, defaultValue: row.Active })

    modularDialog(locStringGlobal.Update, config, '40%')
      .onResult(async (result, dialog) => {
        dialog.load();
        try {
          await store.update(row.key, result);
          message.success(locStringGlobal.Updated);
          dialog.close();
          store.refresh();
        } catch (err) {
          message.error(err);
          console.error(err);
        } finally {
          dialog.load(false);
        }
      })
  };

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
    store.refresh();
    store._refresh();
  }
  componentWillUnmount() {
    this.mounted = false;
    this.props.loc.unsubscribe(this);
  }

  render() {
    const { loc, classes } = this.props;

    return (
      <div>
        <Table
          dataSource={store.fullData}
          columns={columns(this, loc.strings.Management.Users_Management, classes)}
          pagination={{ pageSize: 20 }}
          loading={store.loading}
          size={this.props.settings.tableSize}
          onChange={this.handleTableChange}
          scroll={{ y: singleTableHeader }}
          key={row => row.key}
          bordered
        />
      </div>
    );
  }
}

export default injectSheet(style)(Users);