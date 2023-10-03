import React, { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../config/firebase";
import { User as FirebaseUser } from "firebase/auth";

const initialContextValue = {
  user: null as FirebaseUser | null,
  setUser: (user: FirebaseUser | null) => {},
  loading: true,
};

const AuthenticatedUserContext = createContext(initialContextValue);

export const AuthenticatedUserProvider = ({ children }: any) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export const useAuthenticatedUser = () => {
  return useContext(AuthenticatedUserContext);
};
