import DataStoreBase from '../../../lib/store/DataStoreBase';

class UsersRolesStore extends DataStoreBase {

  constructor() {
    super('Roles');
  };
}

export default new UsersRolesStore();