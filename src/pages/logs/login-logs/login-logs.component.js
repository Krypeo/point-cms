import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';

import { singleTableHeader } from '../../../lib/help/GlobalVariables';
import { columns } from './login-logs.columns';
import style from './login-logs.style';
import store from './login-logs.store';

@inject('loc') @inject('settings') @observer
class LoginLogs extends Component {
  handleTableChange = () => {
    store.refresh();
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
          dataSource={ store.fullData }
          columns={ columns(this, loc.strings.Logs.Login, classes) }
          pagination={ { pageSize: 20 } }
          loading={ store.loading }
          size="small"
          onChange={ this.handleTableChange }
          scroll={ { y: singleTableHeader } }
          rowClassName={ (row) => row.Success ? classes.successRow : classes.warningRow }
          key={ row => row.key }
          bordered
        />
      </div>
    )
  }
}

export default injectSheet(style)(LoginLogs);