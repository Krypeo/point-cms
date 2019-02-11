import React from 'react';
import { Icon, Avatar } from 'antd';

import store from './users.store';
import { successColor, dangerColor } from '../../../lib/help/ColorsVariables';

export const columns = (ref, locString, classes) => [
  {
    key: 'Avatar',
    title: locString.label.Avatar,
    dataIndex: 'Avatar',
    render: (avatar) => (<div style={{ textAlign: 'center' }}><Avatar size="medium" src={avatar} /></div>),
    width: '80px'
  },
  {
    key: 'Name',
    title: locString.label.Name,
    dataIndex: 'Name',
    width: '400px'
  },
  {
    key: 'Surname',
    title: locString.label.Surname,
    dataIndex: 'Surname',
    width: '400px'
  },
  {
    key: 'Email',
    title: locString.label.Email,
    dataIndex: 'Email'
  },
  {
    key: 'Role',
    title: locString.label.Role,
    dataIndex: 'Role',
    width: '230px'
  },
  {
    key: 'ConfirmedEmail',
    title: locString.label.Confirmed_Email,
    dataIndex: 'ConfirmedEmail',
    render: (confirmed) => confirmed
      ? (<div style={{ textAlign: 'center' }}><Icon style={{ color: successColor }} type="check" /></div>)
      : (<div style={{ textAlign: 'center' }}><Icon style={{ color: dangerColor }} type="close" /></div>),
    width: '130px'
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