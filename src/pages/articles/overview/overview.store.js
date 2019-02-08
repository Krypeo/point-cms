import DataStoreBase from '../../../lib/store/DataStoreBase';

class LanguagesStore extends DataStoreBase {
  constructor() {
    super('Articles');
  }
}

export default new LanguagesStore();