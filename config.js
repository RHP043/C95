import firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyAoMu1d3SF0qLl0-GqHHAbYuIHnt9JTWww",
    authDomain: "timetable-app-dfa54.firebaseapp.com",
    databaseURL: "https://timetable-app-dfa54.firebaseio.com",
    projectId: "timetable-app-dfa54",
    storageBucket: "timetable-app-dfa54.appspot.com",
    messagingSenderId: "701574077007",
    appId: "1:701574077007:web:91526ec13cc899126de83a",
    measurementId: "G-0YBKFYBVST"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore()