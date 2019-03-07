import DataStoreBase from '../../../lib/store/DataStoreBase';

class QuestionnairesOverviewStore extends DataStoreBase {

  constructor() {
    super('QuestionnairesOverview');
  };
}

export default new QuestionnairesOverviewStore();