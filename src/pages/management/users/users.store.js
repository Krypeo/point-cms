import { observable, computed, action } from 'mobx';

import DataStoreBase from '../../../lib/store/DataStoreBase';
import firebase from '../../../lib/api/config.api';
import { parseClearData } from '../../../lib/help/GlobalFunctions';

class UsersStore extends DataStoreBase {
  @observable _roles = [];
  _data = [];

  constructor() {
    super('Users');
    this.userRoles = 'Roles';
  };

  @action async _refresh() {
    this.loading = true;

    let roles = await firebase.database().ref(this.userRoles).once('value');
    roles = parseClearData(roles.val())

    this._roles = roles;
    this.loading = false;
    super.refresh();
  }

  @computed get roles() {
    return this._roles;
  };
}

export default new UsersStore();