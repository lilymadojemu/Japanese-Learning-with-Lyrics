import { getApps, initializeApp } from 'firebase/app';
import { 
  initializeAuth, 
  getReactNativePersistence,
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, 
  updateProfile,
  onAuthStateChanged,
  signOut as _signOut
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { firebaseConfig } from '../Secrets';

let app, auth;

// this guards against initializing more than one "App"
const apps = getApps();
if (apps.length === 0) { 
  app = initializeApp(firebaseConfig);
} 

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} catch (error) {
  auth = getAuth(app); // if auth already initialized
}


const subscribeToAuthChanges = (navigation) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('signed in! user:', user);
      navigation.navigate('Tabs');
    } else {
      console.log('user is signed out!');
      navigation.navigate('Login');
    }
  })
}

const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

const signOut = async () => {
  try {
    await _signOut(auth);
  } catch (error) {
    throw error;
  }
}

const signUp = async (displayName, email, password) => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, {displayName: displayName});
    return userCred.user;
  } catch (error) {
    throw error;
  }
}

const getAuthUser = () => {
  return auth.currentUser;
}

export { signIn, signOut, signUp, getAuthUser, subscribeToAuthChanges }