import DataStoreBase from '../../../lib/store/DataStoreBase';

class NewStore extends DataStoreBase {
  constructor() {
    super('Articles');
  }
}

export default new NewStore();