import { action, computed, observable, toJS } from 'mobx';
import firebase from '../api/config.api';

export class DataStoreBase {
  constructor(api) {
    this.api = api;
  }

  @observable _data = [];
  @observable _keys = [];
  @observable _fullData = [];
  @observable loading = false;

  @action async refresh() {
    this.loading = true;
    let data;
    let keys;
    let fullData;

    data = await firebase.database().ref(this.api).once('value');
    this._data = data.val();

    if (this._data === null) {
      keys = [];
    } else {
      keys = Object.keys(toJS(this._data));
      fullData = Object.keys(toJS(this._data)).map((key) => {
        return { key: key, ...toJS(this._data)[key] };
      })
    }

    this._fullData = fullData;
    this._keys = keys;
    this.loading = false;
  };

  insert(entity) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(this.api).push(entity)
        .then(() => {
          resolve();
        })
        .catch(reject);
    });
  };

  update(id, entity) {
    return new Promise((resolve, reject) => {
      firebase.database().ref().child(`${this.api}/${id}`).set(entity)
        .then(() => {
          resolve();
        })
        .catch(reject);
    });
  };

  remove(id) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(this.api).child(id).remove()
        .then(() => {
          resolve();
        })
        .catch(reject);
    });
  };
  
  @computed get data() {
    return toJS(this._data);
  };

  @computed get keys() {
    return toJS(this._keys);
  };

  @computed get fullData() {
    return toJS(this._fullData);
  }

}

export default DataStoreBase;