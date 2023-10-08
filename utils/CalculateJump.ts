import { SessionAttempt } from "../types/session";
import { UserJump } from "../types/user";

const calculateJumpInInches = (feet: string, inches: string) => {
  const feetValue = Number(feet) || 0;
  const inchesValue = Number(inches) || 0;
  return feetValue * 12 + inchesValue;
};

export const calculateSessionStats = (attempts: SessionAttempt[]) => {
  let bestJump = 0;
  let totalJump = 0;
  let numCompletedAttempts = 0;

  attempts.forEach((attempt: SessionAttempt) => {
    const { feet, inches, completed } = attempt;

    if (completed) {
      const jumpInInches = calculateJumpInInches(feet, inches);

      if (jumpInInches > bestJump) {
        bestJump = jumpInInches;
      }

      totalJump += jumpInInches;
      numCompletedAttempts++;
    }
  });

  const averageJump =
    numCompletedAttempts > 0 ? totalJump / numCompletedAttempts : 0;

  return { bestJump, averageJump };
};

export const findBestJump = (
  userProfile: { jumps: UserJump[] },
  jumpId: string
) => {
  if (!userProfile.jumps) {
    userProfile.jumps = [];
  }

  return userProfile.jumps.find(
    (bestJump: UserJump) => bestJump.jumpId === jumpId
  );
};
