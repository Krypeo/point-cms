import DataStoreBase from '../../../lib/store/DataStoreBase';

class LanguagesStore extends DataStoreBase {
  constructor() {
    super('Languages');
  }
}

export default new LanguagesStore();