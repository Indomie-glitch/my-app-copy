import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';

import { auth, database } from '../../../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider).then(response => {
      console.log('run');
      const userId = response.user.uid;
      localStorage.setItem('userId', userId);

      navigate('/decks');
    });
  };

  const logOut = () => {
    console.log('run');
    return signOut(auth).then(() => {
      localStorage.removeItem('userId');
      navigate('/signin');
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  auth.onAuthStateChanged(user => {
    setCurrentUser(user);
  });

  const value = {
    currentUser,
    login,
    signup,
    googleLogin,
    logOut,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
