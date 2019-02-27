import React from 'react';
import { Icon } from 'antd';

import store from './login-logs.store';

export const columns = (ref, locString, classes) => [
  {
    key: 'Category',
    title: 'Doplnit',
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