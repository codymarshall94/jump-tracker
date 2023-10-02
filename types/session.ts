export interface SessionAttempt {
  attemptId: number;
  feet: string;
  inches: string;
  completed: boolean;
}

export interface SessionPlan {
  jumpId: string;
  jumpName: string;
  attempts: SessionAttempt[];
}

export default interface SessionState {
  active: boolean;
  workoutPlan: SessionPlan | null;
}