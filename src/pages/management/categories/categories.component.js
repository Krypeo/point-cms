import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import { ModularConfig, modularDialog, validators } from '@adler-it/reactant-modularis';
import { Table, Modal, message } from 'antd';

import { singleTableHeader } from '../../../lib/help/GlobalVariables';
import style from './categories.style';
import store from './categories.store';
import { columns } from './categories.columns';
import env from '../../../lib/env.service';

@inject('loc') @inject('settings') @observer
class Categories extends Component {
  handleTableChange = () => {
    store.refresh();
  };

  handleInsert = () => {
    const locString = this.props.loc.strings.Management.Categories_Management;
    const locStringGlobal = this.props.loc.strings.Global;

    const config = new ModularConfig()
      .string({
        key: 'Category',
        label: locString.label.Category,
        validators: [validators.required(locStringGlobal.sentences.Required)]
      })

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
    const locString = this.props.loc.strings.Management.Categories_Management;
    const locStringGlobal = this.props.loc.strings.Global;

    const config = new ModularConfig()
      .string({
        key: 'Category',
        label: locString.label.Category,
        defaultValue: row.Category,
        validators: [validators.required(locStringGlobal.sentences.Required)]
      })

    modularDialog(locStringGlobal.Insert, config, '30%')
      .onResult(async (result, dialog) => {
        dialog.load();
        try {
          await store.update(row.key, result);
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

  handleRemove = (row) => {
    const locStringGlobal = this.props.loc.strings.Global;

    Modal.confirm({
      title: `${locStringGlobal.Remove}?`,
      onOk: async () => {
        try {
          await store.remove(row.key);
          message.success(locStringGlobal.Removed);
          store.refresh();
        } catch (err) {
          console.error(err);
          message.error(`${err.name}: ${err.message}`)
        }
      }
    });
  };

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
    console.log(env.get('API_KEY'));

    return (
      <div>
        <Table
          dataSource={store.fullData}
          columns={columns(this, loc.strings.Management.Categories_Management, classes)}
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

export default injectSheet(style)(Categories);