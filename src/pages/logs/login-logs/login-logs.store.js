import DataStoreBase from '../../../lib/store/DataStoreBase';

class LoginLogsStore extends DataStoreBase {
  constructor() {
    super('LoginLogs');
  }
}

export default new LoginLogsStore();