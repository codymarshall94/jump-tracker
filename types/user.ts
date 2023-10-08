export interface UserProfile {
  email: string;
  firstname: string;
  username: string;
  jumps: UserJump[];
  jumpSessions: JumpSession[] | null;
}

export interface UserJump {
  jumpId: string;
  jumpName: string;
  bestJump: number;
  average?: number;
  unit: string;
}

export interface JumpSession {
  date: Date;
  jumpId: string;
  jumpName: string;
  sessionHighestJump: number;
}
