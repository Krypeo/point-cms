import app from 'firebase/app';
import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyB8dH2IhRcp-YtgdGScob1GCwMVwGDB3AU",
  authDomain: "point-cms.firebaseapp.com",
  databaseURL: "https://point-cms.firebaseio.com",
  projectId: "point-cms",
  storageBucket: "",
  messagingSenderId: "812123289170"
}
app.initializeApp(config);
const storage = firebase.storage();

export { storage, firebase as default }