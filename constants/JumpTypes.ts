const JumpTypes = {
  BroadJump: "Broad Jump",
  BoxJump: "Box Jump",
  VerticalJump: "Vertical Jump",
  OneLegBoxJump: "One-Leg Box Jump",
  ApproachJump: "Approach Jump",
  HighJump: "High Jump",
  LongJump: "Long Jump",
} as const;

type JumpType = (typeof JumpTypes)[keyof typeof JumpTypes];

export { JumpTypes, JumpType };
