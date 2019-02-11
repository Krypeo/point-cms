import { toJS, observable, computed, action } from 'mobx';

import DataStoreBase from '../../../lib/store/DataStoreBase';
import firebase from '../../../lib/api/config.api';

class UsersStore extends DataStoreBase {
  @observable _roles = [];

  constructor() {
    super('Users');
    this.userRoles = 'Roles';
  };

  @action async _refresh() {
    this.loading = true;
    const roles = await firebase.database().ref(this.userRoles).once('value');

    this._roles = roles.val();
    this.loading = false;
  }

  @computed get roles() {
    let data = []
    data = Object.keys(toJS(this._roles)).map((key) => {
      return { key: key, ...toJS(this._roles)[key] };
    })
    return data;
  };
}

export default new UsersStore();