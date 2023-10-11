import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  getDocs,
  DocumentData,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useAuthenticatedUser } from "./AuthContext";

type JumpSessionsContextType = {
  jumpSessions: DocumentData[];
  setJumpSessions: React.Dispatch<React.SetStateAction<DocumentData[]>>;
};

const JumpSessionsContext = createContext<JumpSessionsContextType | undefined>(
  undefined
);

type JumpSessionsProviderProps = {
  children: ReactNode;
};

export const JumpSessionsProvider: React.FC<JumpSessionsProviderProps> = ({
  children,
}) => {
  const [jumpSessions, setJumpSessions] = useState<DocumentData[]>([]);
  const { user } = useAuthenticatedUser();

  useEffect(() => {
    const fetchJumpSessions = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const jumpSessionsQuery = query(collection(userDocRef, "jumpSessions"));

        try {
          const querySnapshot = await getDocs(jumpSessionsQuery);
          const sessions = querySnapshot.docs.map((doc) => doc.data());
          setJumpSessions(sessions);
        } catch (error) {
          console.error("Error fetching jump sessions:", error);
        }

        const unsubscribe = onSnapshot(jumpSessionsQuery, (snapshot) => {
          const updatedSessions = snapshot.docs.map((doc) => doc.data());
          setJumpSessions(updatedSessions);
        });

        return () => unsubscribe();
      }
    };

    fetchJumpSessions();
  }, [user]);

  return (
    <JumpSessionsContext.Provider value={{ jumpSessions, setJumpSessions }}>
      {children}
    </JumpSessionsContext.Provider>
  );
};

export const useJumpSessions = () => {
  const context = useContext(JumpSessionsContext);
  if (!context) {
    throw new Error(
      "useJumpSessions must be used within a JumpSessionsProvider"
    );
  }
  return context;
};
