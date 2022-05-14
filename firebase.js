// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKpsjcDKCwgO7r_v4gW-FdBPVPhZ4BXHk",
  authDomain: "musik-8b3f4.firebaseapp.com",
  projectId: "musik-8b3f4",
  storageBucket: "musik-8b3f4.appspot.com",
  messagingSenderId: "947379639668",
  appId: "1:947379639668:web:93eff6a080fa481b724821",
  measurementId: "G-3W8RWLFJ5C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

export default app;
// export { messaging };
