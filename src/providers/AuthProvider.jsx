import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import auth from '../config/firebase.config';
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

const [user,setUser] = useState(null);
const [loading, setLoading] = useState(true)    

const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleProvider)
}

const logOut = () => {
    return signOut(auth)
}

useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,currentUser => {
        setUser(currentUser)
        setLoading(false)
    })
    return () => unSubscribe();
},[])

const authInfo = {user,googleLogin,loading,logOut}

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
        <Toaster
  position="top-right"
  reverseOrder={true}
/>
    </AuthContext.Provider>
  )
}

export default AuthProvider