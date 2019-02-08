import React from 'react';
import { Icon, Tag } from 'antd';

import store from './overview.store';
import { formatDate } from '../../../lib/help/GlobalVariables';
import { successColor, dangerColor } from '../../../lib/help/ColorsVariables';

export const columns = (ref, locString, classes) => [
  {
    key: 'Header',
    title: locString.label.Header,
    dataIndex: 'Header'
  },
  {
    key: 'Categories',
    title: locString.label.Categories,
    dataIndex: 'Categories',
    render: (categories) => categories === undefined ? '' : categories.map(item => {
      return (<Tag key={item} color="geekblue">{item}</Tag>)
    }),
    width: '350px'
  },
  {
    key: 'Date',
    title: locString.label.Date,
    children: [
      {
        key: 'CreatedDate',
        title: locString.label.Created,
        dataIndex: 'CreatedDate',
        render: (date) => (<span>{formatDate(date)}</span>),
        width: '100px'
      },
      {
        key: 'PublishDate',
        title: locString.label.Publish,
        dataIndex: 'CreatedDate',
        render: (date) => (<span>{formatDate(date)}</span>),
        width: '100px'
      }
    ]
  },
  {
    key: 'Author',
    title: locString.label.Author,
    dataIndex: 'Author',
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