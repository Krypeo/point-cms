import React from 'react';
import { Icon } from 'antd';

import store from './languages.store';

export const columns = (ref, classes) => [
  {
    key: 'Name',
    title: 'Name',
    dataIndex: 'Name',
    width: '300px'
  },
  {
    key: 'Cs_CZ',
    title: 'CZ',
    dataIndex: 'Cs_CZ'
  },
  {
    key: 'En_EN',
    title: 'EN',
    dataIndex: 'En_EN'
  },
  {
    key: 'action',
    title: (
      <div>
        <Icon onClick={() => ref.handleInsert()} type="plus" className={classes.iconButton} />
        <Icon onClick={() => store.refresh()} type="redo" className={classes.iconButton} />
      </div>
    ),
    render: (row) => (
      <div>
        <Icon onClick={() => ref.handleEdit(row)} type="edit" className={classes.warningIcon} />
        <Icon onClick={() => ref.handleRemove(row)} type="delete" className={classes.dangerIcon} />
      </div>
    ),
    width: '75px'
  }
];