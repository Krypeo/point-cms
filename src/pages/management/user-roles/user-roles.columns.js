import React from 'react';
import { Icon } from 'antd';

import store from './user-roles.store';
import { successColor, dangerColor } from '../../../lib/help/ColorsVariables';

export const columns = (ref, locString, classes) => [
  {
    key: 'Identifier',
    title: '#',
    dataIndex: 'Identifier',
    width: '50px'
  },
  {
    key: 'Role',
    title: locString.label.Role,
    dataIndex: 'Role',
  },
  {
    key: 'Active',
    title: locString.label.Active,
    dataIndex: 'Active',
    render: (active) => active
      ? (<div style={{ textAlign: 'center' }}><Icon style={{ color: successColor }} type="check" /></div>)
      : (<div style={{ textAlign: 'center' }}><Icon style={{ color: dangerColor }} type="close" /></div>),
    width: '100px'
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