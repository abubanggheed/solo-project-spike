import firebase from 'firebase';

const dbConfig = {
    apiKey: "AIzaSyCMf6nKzEVxa1QOsmx7edThfGqVIvmayq8",
    authDomain: "my-project-1539982235609.firebaseapp.com",
    databaseURL: "https://my-project-1539982235609.firebaseio.com",
    projectId: "my-project-1539982235609",
    storageBucket: "my-project-1539982235609.appspot.com",
    messagingSenderId: "921561837108"
  };

firebase.initializeApp(dbConfig);

export default firebase;
