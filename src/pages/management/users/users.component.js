import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';

import style from './users.style';
import store from './users.store';

@inject('settings') @observer
class Users extends Component {

  remove = async () => {
    const id = '-LY6xnzlEujbJhTP9EHz';
    try {
      await store.remove(id);
      console.log('Removed');
    } catch (err) {
      console.error(err);
    }
  }

  insert = async () => {
    const entity = {
      User: 'Pepicek',
      Name: 'Pepa',
      Surname: 'Popvsky'
    }
    try {
      await store.insert(entity);
      console.log('Inserted');
    } catch (err) {
      console.error(err);
    }
  }

  update = async () => {
    const id = '-LY6xnzlEujbJhTP9EHz';
    const entity = {
      User: 'Frantise',
      Name: 'Franta',
      Surname: 'Frantovsky'
    }
    try {
      await store.update(id, entity);
      console.log('Inserted');
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    store.refresh();
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.insert()}>Insert</Button>
        <Button onClick={() => this.update()}>Update</Button>
        <Button onClick={() => this.delete()}>Delete</Button>
      </div>
    );
  }
}

export default injectSheet(style)(Users);