import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Table, message } from 'antd';
import { ModularConfig, modularDialog, validators } from '@adler-it/reactant-modularis';
import moment from 'moment';

import { formatDateApi, singleTableHeader } from '../../../lib/help/GlobalVariables';
import style from './overview.style';
import store from './overview.store';
import { columns } from './overview.columns';

@inject('settings') @inject('loc') @observer
class OverviewArticles extends Component {
  handleTableChange = () => {
    store.refresh();
  };

  handleInsert = () => {
    const locString = this.props.loc.strings.Management.Language_Management;
    const locStringGlobal = this.props.loc.strings.Global;

    const config = new ModularConfig()
      .string({ key: 'Header', label: locString.label.Header, validators: [validators.required(locStringGlobal.sentences.Required)] })
      .date({ key: 'CreatedDate', defaultValue: moment(), dateFormat: 'DD/MM/YYYY' })
      .date({ key: 'PublishDate', defaultValue: moment(), dateFormat: 'DD/MM/YYYY' })
      .string({ key: 'Author', label: locString.label.Author })
      .switch({ key: 'Published', label: locString.label.Published })

    modularDialog(locStringGlobal.Insert, config, '30%')
      .onResult(async (result, dialog) => {
        result.Categories = [];
        result.CreatedDate = formatDateApi(result.CreatedDate);
        result.PublishDate = formatDateApi(result.PublishDate);

        dialog.load();
        try {
          await store.insert(result);
          message.success(locStringGlobal.Inserted);
          dialog.close();
          store.refresh();
        } catch (err) {
          console.error(err);
        } finally {
          dialog.load(false);
        }
      })
  };

  handleShowArticleDetail = () => {
    console.log('Ready to show detail!')
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

    return (
      <div>
        <Table
          dataSource={store.fullData}
          columns={columns(this, loc.strings.Articles.Overview_Articles, classes)}
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

export default injectSheet(style)(OverviewArticles);