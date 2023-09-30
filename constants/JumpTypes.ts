const JumpTypes = {
  broad_jump: "Broad Jump",
  box_jump: "Box Jump",
  vertical_jump: "Vertical Jump",
  one_leg_box_jump: "One-Leg Box Jump",
  aproach_jump: "Approach Jump",
  high_jump: "High Jump",
  long_jump: "Long Jump",
} as const;

type JumpType = (typeof JumpTypes)[keyof typeof JumpTypes];

export { JumpTypes, JumpType };
