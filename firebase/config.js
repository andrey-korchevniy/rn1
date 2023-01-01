import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB-a9l9oAwx_6p9xrQ6musYl8hPGulN06s',
  authDomain: 'nodejs-test-task-221204.firebaseapp.com',
  projectId: 'nodejs-test-task-221204',
  storageBucket: 'nodejs-test-task-221204.appspot.com',
  messagingSenderId: '392261468526',
  appId: '1:392261468526:web:b2d17b7f559924dff3417f',
  measurementId: 'G-YKZEP39B25',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, storage, auth, db };
