import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Table, message } from 'antd';
import { ModularConfig, modularDialog, validators } from '@adler-it/reactant-modularis';

import style from './user-roles.style';
import store from './user-roles.store';
import { columns } from './user-roles.columns';
import { singleTableHeader } from '../../../lib/help/GlobalVariables';

@inject('settings') @inject('loc') @observer
class UserRoles extends Component {
  handleTableChange = () => {
    store.refresh();
  };

  handleInsert = () => {
    const locString = this.props.loc.strings.Management.User_Roles_Management;
    const locStringGlobal = this.props.loc.strings.Global;

    const config = new ModularConfig()
      .number({ key: 'Identifier', label: locString.label.Identifier })
      .string({ key: 'Role', label: locString.label.Role, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .switch({ key: 'Active', label: locString.label.Active })

    modularDialog(locStringGlobal.Insert, config, '30%')
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
    const locString = this.props.loc.strings.Management.User_Roles_Management;
    const locStringGlobal = this.props.loc.strings.Global;

    const config = new ModularConfig()
      .number({ key: 'Identifier', label: locString.label.Identifier, defaultValue: row.Role })
      .string({ key: 'Role', label: locString.label.Role, defaultValue: row.Role, validators: [validators.required(locStringGlobal.sentences.Required)] })
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

  test = () => {
    const data = {
      Role: 'Administrator',
      Active: true
    }
    try {
      store.insert(data);
      message.success("Hotovo");
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.props.loc.subscribe(this);
    store.refresh();
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
          columns={columns(this, loc.strings.Management.User_Roles_Management, classes)}
          pagination={{ pageSize: 20 }}
          loading={store.loading}
          size={this.props.settings.tableSize}
          onChange={this.handleTableChange}
          scroll={{ y: singleTableHeader }}
          key={row => row.key}
          bordered
        />
      </div>
    )
  }
}

export default injectSheet(style)(UserRoles);