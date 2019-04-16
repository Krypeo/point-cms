import { observable, computed, action } from 'mobx';

import DataStoreBase from '../../../lib/store/DataStoreBase';
import HashTable from '../../../lib/help/HashTable';
import firebase from '../../../lib/api/config.api';
import { parseClearData } from '../../../lib/help/GlobalFunctions';

class UsersStore extends DataStoreBase {
  @observable _roles = [];
  @observable _data = [];

  constructor() {
    super('Users');
    this.userRoles = 'Roles';
  };

  @action async refresh() {
    this.loading = true;

    let roles = await firebase.database().ref(this.userRoles).once('value');
    roles = parseClearData(roles.val());

    this.rolesHashTable = new HashTable(roles, e => e.Identifier);

    this._roles = roles;
    this.loading = false;
    super.refresh();
  }

  @computed get roles() {
    return this._roles.map(item => ({
      value: item.Identifier, text: item.Description, disabled: !item.Active
    }));
  };
  @computed get data() {
    return this._fullData.map(i => {
      const item = Object.assign({}, i);
      item.DeploymentRole = this.rolesHashTable.get(item.Role);
      return item;
    })
  }
}

export default new UsersStore();