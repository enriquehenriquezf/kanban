import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  databaseURL: process.env.databaseURL,
  appId: process.env.appId,
};

export const app = initializeApp(firebaseConfig);