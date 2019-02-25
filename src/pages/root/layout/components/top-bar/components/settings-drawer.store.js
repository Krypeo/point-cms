import DataStoreBase from '../../../../../../lib/store/DataStoreBase';

class SettingsDrawerStore extends DataStoreBase {
  constructor() {
    super('Users');
  }
}

export default new SettingsDrawerStore();