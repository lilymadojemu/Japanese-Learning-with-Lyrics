import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, 
  signOut as _signOut, 
 } from 'firebase/auth';
import { firebaseConfig } from '../Secrets';

let app, auth;
// this guards against initializing more than one "App"
const apps = getApps();
if (apps.length == 0) { 
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}
auth = getAuth(app);


const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error; // not sure why we need to catch and re-throw but it hangs otherwise
  }
}


const signOut = async () => {
  try {
    await _signOut(auth);
  } catch (error) {
    throw error;
  }
}


export { signIn, signOut }