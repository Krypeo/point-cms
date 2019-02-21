import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/database'

let config = {
  apiKey: "AIzaSyB8dH2IhRcp-YtgdGScob1GCwMVwGDB3AU",
  authDomain: "point-cms.firebaseapp.com",
  databaseURL: "https://point-cms.firebaseio.com",
  projectId: "point-cms",
  storageBucket: "",
  messagingSenderId: "812123289170"
}
firebase.initializeApp(config);
const storage = firebase.storage();

export { storage, firebase as default }