import { toJS, observable, computed, action } from 'mobx';

import DataStoreBase from '../../../lib/store/DataStoreBase';
import firebase from '../../../lib/api/config.api';

class NewStore extends DataStoreBase {
  @observable _categories = [];

  constructor() {
    super('Articles');
    this.categoriesApi = 'Categories';
  }

  @action async refresh() {
    this.loading = true;
    const categories = await firebase.database().ref(this.categoriesApi).once('value');

    this._categories = categories.val();
  }

  @computed get categories() {
    let data = []
    data = Object.keys(toJS(this._categories)).map((key) => {
      return { key: key, ...toJS(this._categories)[key] };
    })
    return data;
  };
}

export default new NewStore();