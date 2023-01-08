import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { auth, database } from '../../firebase';

const useAuthentication = () => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

 const login = (email, password) => {
   return signInWithEmailAndPassword(auth, email, password).then(response => {
     const userId = response.user.id;
     localStorage.setItem('userId', userId);
     navigate('/home');
   });
 };

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider).then(response => {
      const userId = response.user.uid;
      localStorage.setItem('userId', userId);
      navigate('/home');
    });
  };

  const logOut = () => {
    return signOut(auth).then(() => {
      localStorage.removeItem('userId');
      navigate('/login');
    });
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  // auth.onAuthStateChanged(user => {
  //   setCurrentUser(user);
  // });

  return {
    currentUser,
    login,
    signUp,
    googleLogin,
    logOut,
  };
};

export default useAuthentication;
