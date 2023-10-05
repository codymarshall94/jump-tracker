import React, { useState, createContext, useContext, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, collection, query, getDocs } from "firebase/firestore";

interface UserProfile {
  email: string;
  firstname: string;
  username: string;
  bestJumps: UserBestJump[] | null;
  jumpSessions: JumpSession[] | null;
}

interface UserBestJump {
  jumpId: string;
  jumpName: string;
  distance: number;
  unit: string;
}

interface JumpSession {
  date: Date;
  jumpId: string;
  jumpName: string;
  sessionHighestJump: number;
}

const AuthenticatedUserContext = createContext<{
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  loading: boolean;
  userProfile: UserProfile | null;
}>({
  user: null,
  setUser: () => {},
  loading: true,
  userProfile: null,
});

interface AuthenticatedUserProviderProps {
  children: React.ReactNode;
}

export const AuthenticatedUserProvider: React.FC<
  AuthenticatedUserProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserProfile = async (user: FirebaseUser | null) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      try {
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          const jumpSessionsRef = collection(userDocRef, "jumpSessions");
          const jumpSessionsQuery = query(jumpSessionsRef);
          const jumpSessionsSnapshot = await getDocs(jumpSessionsQuery);
          const jumpSessionsData = jumpSessionsSnapshot.docs.map(
            (doc) => doc.data() as JumpSession
          );

          userData.jumpSessions = jumpSessionsData;

          setUserProfile(userData);
          console.log(userData);
          setLoading(false);
        } else {
          console.log("User does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      getUserProfile(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthenticatedUserContext.Provider
      value={{ user, setUser, loading, userProfile }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export const useAuthenticatedUser = () => {
  return useContext(AuthenticatedUserContext);
};
