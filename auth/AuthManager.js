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

const apps = getApps();
if (apps.length === 0) { 
  app = initializeApp(firebaseConfig);
} 


  try {
    // This will throw an auth/already-initialized error if 
    // auth is already instantiated. The try{} block lets this
    // happen gracefully.
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
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCred.user, {displayName: displayName});
  return userCred.user; 
}


const getAuthUser = () => {
  return auth.currentUser;
}

export { signIn, signOut, signUp, getAuthUser, subscribeToAuthChanges }