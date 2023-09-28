export interface Jump {
  jumpId: number;
  jumpType: string;
  distance: number;
  completed: boolean;
}

export interface JumpSession {
  sessionId: number;
  date: string;
  jumps: Jump[];
}

export interface BestJump {
  id: number;
  name: string;
  distance: string;
}

export interface UserProfile {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  bestJumps: BestJump[];
  jumpSessions: JumpSession[];
}

export const USER_PROFILE: UserProfile = {
  userId: 123,
  username: "john_doe",
  fullName: "John Doe",
  email: "john.doe@example.com",
  bestJumps: [
    {
      id: 1,
      name: "Broad",
      distance: "69",
    },
    {
      id: 2,
      name: "Vertical",
      distance: "42",
    },
    {
      id: 3,
      name: "High",
      distance: "106",
    },
  ],
  jumpSessions: [
    {
      sessionId: 1,
      date: "2023-09-28",
      jumps: [
        {
          jumpId: 1,
          jumpType: "Broad Jump",
          distance: 220,
          completed: true,
        },
        {
          jumpId: 2,
          jumpType: "Vertical Jump",
          distance: 90,
          completed: true,
        },
      ],
    },
    {
      sessionId: 2,
      date: "2023-09-30",
      jumps: [
        {
          jumpId: 1,
          jumpType: "Broad Jump",
          distance: 215,
          completed: true,
        },
        {
          jumpId: 2,
          jumpType: "Vertical Jump",
          distance: 88,
          completed: true,
        },
      ],
    },
  ],
};
