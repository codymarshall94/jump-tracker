import { SessionAttempt } from "../types/session";

export const calculateBestJump = (attempts: SessionAttempt[]): number => {
  let sessionBestJump = 0;

  for (const jump of attempts) {
    const feetValue = parseFloat(jump.feet) || 0;
    const inchesValue = parseFloat(jump.inches) || 0;
    const jumpInInches = feetValue * 12 + inchesValue;

    if (jumpInInches > sessionBestJump) {
      sessionBestJump = jumpInInches;
    }
  }

  return sessionBestJump;
};

export const calculateAverageJump = (attempts: SessionAttempt[]): number => {
  if (attempts.length === 0) return 0;

  let totalJumpDistance = 0;

  for (const jump of attempts) {
    const feetValue = parseFloat(jump.feet) || 0;
    const inchesValue = parseFloat(jump.inches) || 0;
    const jumpInInches = feetValue * 12 + inchesValue;
    totalJumpDistance += jumpInInches;
  }

  return totalJumpDistance / attempts.length;
};

export const findBestJump = (userProfile: any, jumpId: string): any => {
  if (!userProfile.bestJumps) {
    userProfile.bestJumps = [];
  }

  return userProfile.bestJumps.find(
    (bestJump: any) => bestJump.jumpId === jumpId
  );
};
