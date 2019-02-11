import DataStoreBase from '../../../../../lib/store/DataStoreBase';

class TopBarStore extends DataStoreBase {
  constructor() {
    super('Users');
  }
}

export default new TopBarStore();