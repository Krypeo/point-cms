import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Table, Modal, message } from 'antd';
import { ModularConfig, modularDialog } from '@adler-it/reactant-modularis';

import { ToLowerCase } from '../../../lib/help/GlobalFunctions';
import style from './languages.style';
import store from './languages.store';
import { columns } from './languages.columns';

@inject('settings') @inject('language') @observer
class Languages extends Component {
  handleTableChange = () => {
    store.refresh();
  };

  handleInsert = () => {
    const config = new ModularConfig()
      .string({ key: 'Name', label: 'Název' })
      .string({ key: 'Cs_CZ', label: 'Česky' })
      .string({ key: 'En_EN', label: 'Anglicky' })

    modularDialog('Vlozit', config, '30%')
      .onResult(async (result, dialog) => {
        result.Name = ToLowerCase(result.Name)
        dialog.load();
        try {
          await store.insert(result);
          message.success('Vlozeno');
          dialog.close();
          store.refresh();
        } catch(err) {
          message.error(err);
          console.error(err);
        } finally {
          dialog.load(false);
        }
      })
  };

  handleEdit = (row) => {
    const config = new ModularConfig()
      .string({ key: 'Name', label: 'Název', defaultValue: row.Name })
      .string({ key: 'Cs_CZ', label: 'Česky', defaultValue: row.Cs_CZ })
      .string({ key: 'En_EN', label: 'Anglicky', defaultValue: row.En_EN })

    modularDialog('Vlozit', config, '30%')
      .onResult(async (result, dialog) => {
        dialog.load();
        try {
          await store.update(row.key, result);
          message.success('Upraveno');
          dialog.close();
          store.refresh();
        } catch(err) {
          message.error(err);
          console.error(err);
        } finally {
          dialog.load(false);
        }
      })
  };

  handleRemove = (row) => {
		Modal.confirm({
			title: 'Odstranit?',
			onOk: async () => {
				try {
					await store.remove(row.key);
					message.success('Odstraneno');
          store.refresh();
				} catch (err) {
					console.error(err);
					message.error(`${err.name}: ${err.message}`)
				}
			}
		});
	};


  componentDidMount() {
    store.refresh();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Table
          dataSource={store.fullData}
          columns={columns(this, classes)}
          pagination={{ pageSize: 13 }}
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