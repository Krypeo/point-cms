import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Table, Modal, message } from 'antd';
import { ModularConfig, modularDialog, validators } from '@adler-it/reactant-modularis';

import { ToLowerCase } from '../../../lib/help/GlobalFunctions';
import { singleTableHeader } from '../../../lib/help/GlobalVariables';
import style from './languages.style';
import store from './languages.store';
import { columns } from './languages.columns';

@inject('settings') @inject('loc') @observer
class Languages extends Component {
  handleTableChange = () => {
    store.refresh();
  };

  handleInsert = () => {
    const locString = this.props.loc.strings.Management.Language_Management;
    const locStringGlobal = this.props.loc.strings.Global;

    const config = new ModularConfig()
      .string({ key: 'Name', label: locString.label.Name, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .string({ key: 'Cs_CZ', label: locString.label.Czech, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .string({ key: 'En_EN', label: locString.label.English, validators: [validators.required(locStringGlobal.sentences.Required)] })

    modularDialog(locStringGlobal.Insert, config, '30%')
      .onResult(async (result, dialog) => {
        result.Name = ToLowerCase(result.Name)
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
    const locString = this.props.loc.strings.Management.Language_Management;
    const locStringGlobal = this.props.loc.strings.Global;

    const config = new ModularConfig()
      .string({ key: 'Name', label: locString.label.Name, defaultValue: row.Name, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .string({ key: 'Cs_CZ', label: locString.label.Czech, defaultValue: row.Cs_CZ, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .string({ key: 'En_EN', label: locString.label.English, defaultValue: row.En_EN, validators: [validators.required(locStringGlobal.sentences.Required)] })

    modularDialog(locStringGlobal.Update, config, '30%')
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
    const { classes, loc } = this.props;

    return (
      <div>
        <Table
          dataSource={store.fullData}
          columns={columns(this, loc.strings.Management.Language_Management, classes)}
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

export default injectSheet(style)(Languages);