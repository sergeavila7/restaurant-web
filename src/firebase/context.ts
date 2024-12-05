import { createContext } from 'react';
import firebaseApp from './firebase';

const FirebaseContext = createContext<{
  firebaseApp: typeof firebaseApp;
} | undefined>(undefined);

export default FirebaseContext;
