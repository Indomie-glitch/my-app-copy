import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPSbjZ9F1TgI43T0SH68rUi9TMHBXRw - s",
  authDomain: "csia-41409.firebaseapp.com",
  databaseURL: "https://csia-41409-default-rtdb.firebaseio.com",
  projectId: "csia-41409",
  storageBucket: "csia-41409.appspot.com",
  messagingSenderId: "714268776254",
  appId: "1:714268776254:web:93d9ef26a5d9c7d7f8be6f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();


