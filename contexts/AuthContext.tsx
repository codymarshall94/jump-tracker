import { useState, createContext, useContext, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { UserProfile } from "../types/user";

const AuthenticatedUserContext = createContext<{
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  loading: boolean;
  userProfile: UserProfile | null;
  setUserProfile: (userProfile: UserProfile | null) => void;
}>({
  user: null,
  setUser: () => {},
  loading: true,
  userProfile: null,
  setUserProfile: () => {},
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
          setUserProfile(userData);
          setLoading(false);

          onSnapshot(userDocRef, (snapshot) => {
            const updatedUserData = snapshot.data() as UserProfile;
            setUserProfile(updatedUserData);
          });
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
      value={{ user, setUser, loading, userProfile, setUserProfile }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export const useAuthenticatedUser = () => {
  return useContext(AuthenticatedUserContext);
};
