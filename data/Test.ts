export interface Jump {
  id: number;
  jumpId: string;
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
  firstName: string;
  lastName: string;
  email: string;
  bestJumps: BestJump[];
  jumpSessions: JumpSession[];
}

export const USER_PROFILE: UserProfile = {
  userId: 123,
  username: "john_doe",
  firstName: "John",
  lastName: "Doe",
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
          id: 1,
          jumpId: "broad_jump",
          jumpType: "Broad Jump",
          distance: 220,
          completed: true,
        },
        {
          id: 2,
          jumpId: "vertical_jump",
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
          id: 1,
          jumpId: "broad_jump",
          jumpType: "Broad Jump",
          distance: 215,
          completed: true,
        },
        {
          id: 2,
          jumpId: "vertical_jump",
          jumpType: "Vertical Jump",
          distance: 88,
          completed: true,
        },
      ],
    },
    {
      sessionId: 3,
      date: "2023-10-02",
      jumps: [
        {
          id: 1,
          jumpId: "broad_jump",
          jumpType: "Broad Jump",
          distance: 150,
          completed: true,
        },
        {
          id: 2,
          jumpId: "vertical_jump",
          jumpType: "Vertical Jump",
          distance: 92,
          completed: true,
        },
      ],
    },
    {
      sessionId: 4,
      date: "2023-10-05",
      jumps: [
        {
          id: 1,
          jumpId: "broad_jump",
          jumpType: "Broad Jump",
          distance: 208,
          completed: true,
        },
        {
          id: 2,
          jumpId: "vertical_jump",
          jumpType: "Vertical Jump",
          distance: 87,
          completed: true,
        },
      ],
    },
    
  ],
};
