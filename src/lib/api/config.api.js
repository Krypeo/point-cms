import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/database'

import env from '../env.service';

let config = {
  apiKey: env.get('API_KEY'),
  authDomain: env.get('AUTH_DOMAIN'),
  databaseURL: env.get('DATABASE_URL'),
  projectId: env.get('PROJECT_ID'),
  storageBucket: env.get('STORAGE_BUCKET'),
  messagingSenderId: env.get('MESSAGING_ID')
}
firebase.initializeApp(config);
const storage = firebase.storage();

export { storage, firebase as default }