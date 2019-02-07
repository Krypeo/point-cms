import DataStoreBase from '../../../lib/store/DataStoreBase';

class UsersStore extends DataStoreBase {
  constructor() {
    super('Users');
  }
}

export default new UsersStore();