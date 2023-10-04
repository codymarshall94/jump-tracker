import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import RepList from "./components/repList/RepList";
import { useRouter } from "expo-router";
import { useSession } from "../../contexts/SessionContext";
import { SessionAttempt } from "../../types/session";
import { useAuthenticatedUser } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  runTransaction,
} from "firebase/firestore";

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
  const { user } = useAuthenticatedUser();
  // State
  const [jumpAttempts, setJumpAttempts] = useState<SessionAttempt[]>([]);
  // Refs
  const flatListRef = useRef<FlatList<SessionAttempt | null>>(null);
  // Variables
  const maxInputLength = 2;
  const { workoutPlan } = session;
  const { jumpId, jumpName } = workoutPlan || {};

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

  const findBestJump = (userProfile: any, jumpId: string) => {
    if (!userProfile.bestJumps) {
      userProfile.bestJumps = [];
    }

    return userProfile.bestJumps.find(
      (bestJump: any) => bestJump.jumpId === jumpId
    );
  };

  // For Cody's reference. https://firebase.google.com/docs/firestore/manage-data/transactions
  // Transactions : either all of the operations succeed or none of them are applied.
  const handleFinishTraining = async () => {
    if (user && jumpId && jumpName) {
      const sessionHighestJump = calculateHighestJump(jumpAttempts);
      const userRef = doc(db, "users", user.uid);

      try {
        await runTransaction(db, async (transaction) => {
          const userProfileDoc = await getDoc(userRef);
          if (!userProfileDoc.exists()) {
            throw new Error("User profile does not exist");
          }

          const userProfile = userProfileDoc.data();
          const userBestJump = findBestJump(userProfile, jumpId);

          if (
            userBestJump === undefined ||
            sessionHighestJump > userBestJump.distance
          ) {
            const newBestJump = {
              jumpId,
              jumpName,
              distance: sessionHighestJump,
              unit: "in",
            };

            const existingBestJumpIndex = userProfile.bestJumps.findIndex(
              (bestJump: any) => bestJump.jumpId === jumpId
            );

            if (existingBestJumpIndex !== -1) {
              userProfile.bestJumps[existingBestJumpIndex] = newBestJump;
            } else {
              userProfile.bestJumps.push(newBestJump);
            }

            transaction.update(userRef, { bestJumps: userProfile.bestJumps });
          }

          const jumpSessionsRef = collection(userRef, "jumpSessions");
          const jumpSessionData = {
            jumpId,
            jumpName,
            sessionHighestJump,
            unit: "in",
            date: new Date(),
          };
          await addDoc(jumpSessionsRef, jumpSessionData);
        });
      } catch (error) {
        console.error("Error updating user data:", error);
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
      <Button onPress={handleFinishTraining}>Finish</Button>
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
