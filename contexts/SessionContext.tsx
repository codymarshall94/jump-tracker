import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SessionState from "../types/session";

interface SessionContextType {
  session: SessionState;
  setSession: React.Dispatch<React.SetStateAction<SessionState>>;
  updateSession: (newSession: SessionState) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<SessionState>({
    active: false,
    workoutPlan: null,
  });

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem("session");
        if (storedSession) {
          const parsedSession = JSON.parse(storedSession);
          setSession(parsedSession);
        }
      } catch (error) {
        console.error("Error loading session from AsyncStorage: ", error);
      }
    };

    loadSession();
  }, []);

  useEffect(() => {
    const saveSession = async () => {
      try {
        await AsyncStorage.setItem("session", JSON.stringify(session));
      } catch (error) {
        console.error("Error saving session to AsyncStorage: ", error);
      }
    };

    saveSession();
  }, [session]);

  const updateSession = (newSession: SessionState) => {
    setSession(newSession);
  };

  return (
    <SessionContext.Provider value={{ session, setSession, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
