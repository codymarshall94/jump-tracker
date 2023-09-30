import React, { createContext, useContext, useState, ReactNode } from "react";

interface SessionPlan {
  jumpId: string;
  jumpName: string;
}

interface SessionState {
  active: boolean;
  workoutPlan: SessionPlan | null;
}

interface SessionContextType {
  session: SessionState;
  setSession: React.Dispatch<React.SetStateAction<SessionState>>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
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

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};
