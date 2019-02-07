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
    key: 'Cz',
    title: 'CZ',
    dataIndex: 'Cs_CZ'
  },
  {
    key: 'En',
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
    render: () => (
      <div>
        <Icon onClick={() => store.refresh()} type="edit" className={classes.warningIcon} />
          <Icon onClick={() => store.refresh()} type="delete" className={classes.dangerIcon} />
      </div>
    ),
    width: '90px'
  }
];