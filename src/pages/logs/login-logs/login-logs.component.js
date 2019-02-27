import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';

import { singleTableHeader } from '../../../lib/help/GlobalVariables';
import { columns } from './login-logs.columns';
import style from './login-logs.style';
// import store from './login-logs.store';

@inject('loc') @inject('settings') @observer
class LoginLogs extends Component {

  render() {
    const { loc, classes } = this.props;
    return (
      <div>
        <Table
          dataSource={[]}
          columns={columns(this, loc.strings.Management.Categories_Management, classes)}
          pagination={{ pageSize: 20 }}
          loading={false}
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

export default injectSheet(style)(LoginLogs);