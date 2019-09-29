import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB_h58uzijCxKBtvgNBpZa4sbREevcbsRY",
    authDomain: "snstudent-860e5.firebaseapp.com",
    databaseURL: "https://snstudent-860e5.firebaseio.com",
    projectId: "snstudent-860e5",
    storageBucket: "snstudent-860e5.appspot.com",
    messagingSenderId: "727461116658",
    appId: "1:727461116658:web:1074ae138eec8d2c37ee6b",
    measurementId: "G-24ZKPNXKNR"
};

firebase.initializeApp(firebaseConfig);

export default firebase;