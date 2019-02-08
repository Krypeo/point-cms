import React from 'react';
import { Icon } from 'antd';

import store from './languages.store';

export const columns = (ref, locString, classes) => [
  {
    key: 'Name',
    title: locString.label.Name,
    dataIndex: 'Name',
    width: '300px'
  },
  {
    key: 'Cs_CZ',
    title: locString.label.Czech,
    dataIndex: 'Cs_CZ',
    width: '530px'
  },
  {
    key: 'En_EN',
    title: locString.label.English,
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