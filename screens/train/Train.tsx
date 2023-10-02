import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import RepList from "./components/repList/RepList";
import { useRouter } from "expo-router";
import { useSession } from "../../contexts/SessionContext";
import { useUserProfile } from "../../contexts/UserContext";
import { UserProfile } from "../../data/Test";
import { SessionAttempt } from "../../types/session";

const initialJumpAttempts = Array.from({ length: 5 }, (_, index) => ({
  attemptId: index,
  feet: "",
  inches: "",
  completed: false,
}));

export default function Train() {
  // General
  const theme = useTheme();
  const router = useRouter();
  // Context
  const { session, setSession, updateSession } = useSession();
  const { userProfile, setUserProfile } = useUserProfile();
  // State
  const [jumpAttempts, setJumpAttempts] = useState<SessionAttempt[]>([]);
  // Refs
  const flatListRef = useRef<FlatList<SessionAttempt | null>>(null);
  // Variables
  const maxInputLength = 2;
  const workoutPlan = session.workoutPlan;
  const jumpId = workoutPlan?.jumpId;
  const jumpName = workoutPlan?.jumpName;

  useEffect(() => {
    if (session.workoutPlan?.attempts) {
      setJumpAttempts(session.workoutPlan?.attempts);
    }
  }, [session]);

  const handleAddJumpRep = () => {
    setJumpAttempts((prevAttempts) => [
      ...prevAttempts,
      {
        attemptId: jumpAttempts.length,
        feet: "",
        inches: "",
        completed: false,
      },
    ]);
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd();
    }
  };

  const handleRepInput = (id: number, feet: string, inches: string) => {
    const feetValue = Number(feet) || 0;
    const inchesValue = Number(inches) || 0;

    if (
      feetValue >= 0 &&
      feetValue <= 30 &&
      inchesValue >= 0 &&
      inchesValue < 12
    ) {
      const totalDistance = feetValue + inchesValue / 12;

      if (!session.workoutPlan) {
        return;
      }

      const updatedJumpAttempts = jumpAttempts.map((rep) =>
        rep.attemptId === id
          ? {
              ...rep,
              feet: feet,
              inches: inches,
              completed: !isNaN(totalDistance),
            }
          : rep
      );

      updateSession({
        ...session,
        workoutPlan: {
          ...session.workoutPlan,
          attempts: updatedJumpAttempts,
        },
      });
    }
  };

  const handleCompleteRep = (id: number, checked: boolean) => {
    setJumpAttempts((prevAttempts) =>
      prevAttempts.map((rep) =>
        rep.attemptId === id ? { ...rep, completed: checked } : rep
      )
    );
  };

  const calculateHighestJump = (attempts: SessionAttempt[]) => {
    let sessionHighestJump = 0;

    for (const jump of attempts) {
      const feetValue = parseFloat(jump.feet) || 0;
      const inchesValue = parseFloat(jump.inches) || 0;
      const jumpInInches = feetValue * 12 + inchesValue;

      if (jumpInInches > sessionHighestJump) {
        sessionHighestJump = jumpInInches;
      }
    }
    return sessionHighestJump;
  };

  const findOrCreateBestJumpIndex = (
    userProfile: UserProfile,
    jumpId: string,
    jumpName: string
  ) => {
    const jumpIndex = userProfile.bestJumps.findIndex(
      (bestJump) => bestJump.jumpId === jumpId
    );

    if (jumpIndex === -1) {
      userProfile.bestJumps.push({
        jumpId: jumpId,
        name: jumpName,
        distance: 0,
      });
      return userProfile.bestJumps.length - 1;
    }

    return jumpIndex;
  };

  const handleFinishTraining = () => {
    if (userProfile) {
      const sessionHighestJump = calculateHighestJump(jumpAttempts);

      if (jumpId && jumpName) {
        const jumpIndex = findOrCreateBestJumpIndex(
          userProfile,
          jumpId,
          jumpName
        );
        const currentBestJump = userProfile.bestJumps[jumpIndex].distance;

        if (sessionHighestJump > currentBestJump) {
          userProfile.bestJumps[jumpIndex].distance = sessionHighestJump;
        }
        setUserProfile(userProfile);
      }
    }
  };

  const handleCancelTraining = () => {
    setJumpAttempts(initialJumpAttempts);
    setSession({
      active: false,
      workoutPlan: null,
    });
    router.push("/");
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text style={{ ...styles.title, color: theme.colors.onBackground }}>
        {jumpName}
      </Text>
      <View style={styles.attemptsContainer}>
        <RepList
          jumpAttempts={jumpAttempts}
          maxInputLength={maxInputLength}
          onRepInput={handleRepInput}
          onCheckboxChange={handleCompleteRep}
          flatListRef={flatListRef}
        />
        <View style={styles.btnContainer}>
          <Button icon="plus" mode="outlined" onPress={handleAddJumpRep}>
            Add Rep
          </Button>
          <Button mode="text" onPress={handleCancelTraining}>
            Cancel Training
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  attemptsContainer: {
    padding: 12,
    gap: 4,
  },
  btnContainer: {
    paddingVertical: 24,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12,
    marginVertical: 8,
  },
});
