import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e76d7.firebaseapp.com",
  projectId: "mern-blog-e76d7",
  storageBucket: "mern-blog-e76d7.appspot.com",
  messagingSenderId: "1068116792935",
  appId: "1:1068116792935:web:477ffb4456e0f8578326c2",
  measurementId: "G-B0R012PTN5",
};

const app = initializeApp(firebaseConfig);

export default app;
