import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import auth from "../config/firebase.config";
import useAxiosCommon from "./../hooks/useAxiosCommon";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosCommon = useAxiosCommon();
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const emailPasswordRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailPasswordLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const { data: role } = await axiosCommon.get(
          `/role/${currentUser.email}`
        );
        const user = { email: currentUser.email, role: role };
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_API}/auth`, user, {
          withCredentials: true,
        });
      } else {
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_API}/logout`, user, {
          withCredentials: true,
        });
      }
    });
    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    googleLogin,
    loading,
    logOut,
    emailPasswordRegister,
    emailPasswordLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <Toaster position="top-right" reverseOrder={true} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
