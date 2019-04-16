import React from 'react';
import { Icon, Avatar, Tag } from 'antd';

import store from './users.store';
import { successColor, dangerColor } from '../../../lib/help/ColorsVariables';
import { randomColor } from '../../../lib/help/GlobalFunctions';

export const columns = (ref, locString, classes) => [
  {
    key: 'Avatar',
    title: locString.label.Avatar,
    render: (row) => {
      const FirstLetterOfName = row.Name[0];
      return (
        <div style={ { textAlign: 'center' } }>{
          (row.Avatar.length > 1)
            ? <Avatar size="medium" src={ row.Avatar } />
            : <Avatar style={ { background: `${randomColor()}` } } size="medium">{ FirstLetterOfName }</Avatar> }
        </div>
      )
    },
    width: '80px'
  },
  {
    key: 'Name',
    title: locString.label.Name,
    dataIndex: 'Name',
    width: '300px'
  },
  {
    key: 'Surname',
    title: locString.label.Surname,
    dataIndex: 'Surname',
    width: '300px'
  },
  {
    key: 'Email',
    title: locString.label.Email,
    dataIndex: 'Email'
  },
  {
    key: 'Role',
    title: locString.label.Role,
    dataIndex: 'DeploymentRole.Description',
    render: (role) => (<Tag color="volcano">{ role }</Tag>),
    width: '230px'
  },
  {
    key: 'ConfirmedEmail',
    title: locString.label.Confirmed_Email,
    dataIndex: 'ConfirmedEmail',
    render: (confirmed) => confirmed
      ? (<div style={ { textAlign: 'center' } }><Icon style={ { color: successColor } } type="check" /></div>)
      : (<div style={ { textAlign: 'center' } }><Icon style={ { color: dangerColor } } type="close" /></div>),
    width: '130px'
  },
  {
    key: 'Active',
    title: locString.label.Active,
    dataIndex: 'Active',
    render: (active) => active
      ? (<div style={ { textAlign: 'center' } }><Icon style={ { color: successColor } } type="check" /></div>)
      : (<div style={ { textAlign: 'center' } }><Icon style={ { color: dangerColor } } type="close" /></div>),
    width: '100px'
  },
  {
    key: 'action',
    title: (
      <div>
        <Icon onClick={ () => ref.handleInsert() } type="plus" className={ classes.iconButton } />
        <Icon onClick={ () => store.refresh() } type="redo" className={ classes.iconButton } />
      </div>
    ),
    render: (row) => (
      <div>
        <Icon onClick={ () => ref.handleEdit(row) } type="edit" className={ classes.warningIcon } />
        <Icon onClick={ () => ref.handleRemove(row) } type="delete" className={ classes.dangerIcon } />
      </div>
    ),
    width: '75px'
  }
];