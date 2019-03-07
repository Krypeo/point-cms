import React from 'react';
import { Icon } from 'antd';

import store from './questionnaires-overview.store';
import { successColor, dangerColor } from '../../../lib/help/ColorsVariables';

export const columns = (ref, locString, classes) => [
  {
    key: 'Question',
    title: locString.label.Question,
    dataIndex: 'Question'
  },
  {
    key: 'NumberOfVotes',
    title: locString.label.Number_Of_Votes,
    dataIndex: 'NumberOfVotes',
    width: '150px'
  },
  {
    key: 'Published',
    title: locString.label.Published,
    dataIndex: 'Published',
    render: (published) => published
      ? (<div style={{ textAlign: 'center' }}><Icon style={{ color: successColor }} type="check" /></div>)
      : (<div style={{ textAlign: 'center' }}><Icon style={{ color: dangerColor }} type="close" /></div>),
    width: '100px'
  },
  {
    key: 'DateOfPublish',
    title: locString.label.Date_Of_Publish,
    dataIndex: 'DateOfPublish',
    width: '150px'
  },
  {
    key: 'action',
    title: (
      <div>
        <Icon onClick={() => ref.handleInsert()} type="plus" className={classes.iconButton} />
        <Icon type="redo" onClick={() => store.refresh()} className={classes.iconButton} />
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