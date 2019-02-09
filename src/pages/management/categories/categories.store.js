import DataStoreBase from '../../../lib/store/DataStoreBase';

class CategoriesStore extends DataStoreBase {
  constructor() {
    super('Categories');
  }
}

export default new CategoriesStore();