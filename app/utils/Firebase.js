import * as Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBpYv3tr2T7q3swUKnC6rbzZJ1wc2gZSSw",
  authDomain: "learn-react-redux-c9a01.firebaseapp.com",
  databaseURL: "https://learn-react-redux-c9a01.firebaseio.com",
  storageBucket: "learn-react-redux-c9a01.appspot.com",
  messagingSenderId: "948913454797"
};

export default Firebase.initializeApp(config);
