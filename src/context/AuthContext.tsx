import React, { useEffect, useState } from "react";
// import firebase from "firebase/app";
import { auth } from "../firebase/fb";
import firebase from "firebase/compat";
// import User = firebase.User;
export type User = Partial<firebase.User>;

export const AuthContext = React.createContext<User | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      return setUser((): User | null => firebaseUser);
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
