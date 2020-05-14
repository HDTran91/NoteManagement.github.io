import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "api-key",
    authDomain: "notereactfedu-1dbe2.firebaseapp.com",
    databaseURL: "https://notereactfedu-1dbe2.firebaseio.com/",
    projectId: "notereactfedu-1dbe2",
    storageBucket: "notereactfedu-1dbe2.appspot.com",
    messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",
  };


  
  
  firebase.initializeApp(firebaseConfig)
  export const NoteData = firebase.database().ref('DataForNote')