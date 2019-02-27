import React from 'react';
import { Icon } from 'antd';

import store from './login-logs.store';

export const columns = (ref, locString, classes) => [
  {
    key: 'Username',
    title: locString.label.Email,
    dataIndex: 'Username'
  },
  {
    key: 'IpAddress',
    title: locString.label.Ip_Address,
    dataIndex: 'IpAddress',
    width: '300px'
  },
  {
    key: 'City',
    title: locString.label.City,
    dataIndex: 'City',
    width: '300px'
  },
  {
    key: 'Date',
    title: locString.label.Date,
    dataIndex: 'Date',
    width: '200px'
  },
  {
    key: 'Time',
    title: locString.label.Time,
    dataIndex: 'Time',
    width: '180px'
  },
  {
    key: 'action',
    title: (
      <div>
        <Icon onClick={() => store.refresh()} type="redo" className={classes.iconButton} />
      </div>
    ),
    width: '50px'
  }
];