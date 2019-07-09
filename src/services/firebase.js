import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBrlg5qVfZ8NHGUE4aKmB-YSxQsr_GICN8',
  authDomain: 'playbyplay-9b6ce.firebaseapp.com',
  databaseURL: 'https://playbyplay-9b6ce.firebaseio.com',
  projectId: 'playbyplay-9b6ce',
  storageBucket: 'playbyplay-9b6ce.appspot.com',
  messagingSenderId: '225496777713',
  appId: '1:225496777713:web:d35f52e223847180'
};

export const db = firebase.initializeApp(firebaseConfig).firestore();
