import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Appbar, Button, Text, useTheme } from "react-native-paper";
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
import CustomModal from "../../components/modal/Modal";
import { findBestJump, calculateSessionStats } from "../../utils/CalculateJump";
import { UserProfile } from "../../types/user";
import MyDialog from "../../components/dialog/MyDialog";

const modalState = {
  finished: {
    title: "Great Session!",
  },
  finishedBest: {
    title: "New Personal Best!",
  },
};

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
  const [bestJump, setBestJump] = useState<number>(0);
  const [averageJump, setAverageJump] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [newPersonalBest, setNewPersonalBest] = useState<boolean>(false);
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

  const createNewJumpAttempt = (id: number) => ({
    attemptId: id,
    feet: "",
    inches: "",
    completed: false,
  });

  const handleAddJumpRep = () => {
    setJumpAttempts((prevAttempts) => [
      ...prevAttempts,
      createNewJumpAttempt(prevAttempts.length),
    ]);
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd();
    }
  };

  const validateInput = (feet: string, inches: string) => {
    const feetValue = Number(feet) || 0;
    const inchesValue = Number(inches) || 0;

    return feetValue >= 0 &&
      feetValue <= 30 &&
      inchesValue >= 0 &&
      inchesValue < 12
      ? { feetValue, inchesValue, totalDistance: feetValue + inchesValue / 12 }
      : null;
  };

  const handleUpdateJumpRep = (id: number, feet: string, inches: string) => {
    const inputValidation = validateInput(feet, inches);
    if (inputValidation && session.workoutPlan) {
      const updatedJumpAttempts = jumpAttempts.map((rep) =>
        rep.attemptId === id
          ? {
              ...rep,
              feet,
              inches,
              completed: !isNaN(inputValidation.totalDistance),
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

  const handleOpenFinishDialog = () => {
    setIsDialogVisible(true);
  };

  // For Cody's reference. https://firebase.google.com/docs/firestore/manage-data/transactions
  // Transactions : either all of the operations succeed or none of them are applied.
  const handleFinishTraining = async () => {
    setIsDialogVisible(false);
    if (!user || !jumpId || !jumpName) {
      console.error("User, jumpId, or jumpName is missing.");
      return;
    }

    try {
      const { bestJump, averageJump } = calculateSessionStats(jumpAttempts);

      const userRef = doc(db, "users", user.uid);
      const userProfileDoc = await getDoc(userRef);

      if (!userProfileDoc.exists()) {
        console.error("User profile does not exist.");
        return;
      }

      const userProfile = userProfileDoc.data() as UserProfile;
      const userBestJump = findBestJump(userProfile, jumpId);

      setBestJump(bestJump);
      setAverageJump(averageJump);

      if (
        userBestJump === undefined ||
        bestJump > (userBestJump?.bestJump || 0)
      ) {
        setNewPersonalBest(true);

        const newBestJump = {
          jumpId,
          jumpName,
          bestJump,
          averageJump,
          unit: "in",
        };

        const existingBestJumpIndex = userProfile.jumps.findIndex(
          (bestJump: any) => bestJump.jumpId === jumpId
        );

        if (existingBestJumpIndex !== -1) {
          userProfile.jumps[existingBestJumpIndex] = newBestJump;
        } else {
          userProfile.jumps.push(newBestJump);
        }

        await runTransaction(db, async (transaction) => {
          transaction.update(userRef, { jumps: userProfile.jumps });

          const jumpSessionsRef = collection(userRef, "jumpSessions");
          const jumpSessionData = {
            jumpId,
            jumpName,
            bestJump,
            unit: "in",
            date: new Date(),
          };
          await addDoc(jumpSessionsRef, jumpSessionData);
        });

        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
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
    <>
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.secondaryContainer,
          justifyContent: "space-between",
        }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Training Session" />
        <Appbar.Action
          icon="check-decagram"
          onPress={handleOpenFinishDialog}
          color={theme.colors.primary}
        />
      </Appbar.Header>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={{ ...styles.title, color: theme.colors.onBackground }}>
          {jumpName}
        </Text>
        <View style={styles.attemptsContainer}>
          <RepList
            jumpAttempts={jumpAttempts}
            maxInputLength={maxInputLength}
            onRepInput={handleUpdateJumpRep}
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
      <CustomModal
        visible={isModalVisible}
        hideModal={() => setIsModalVisible(false)}
        title={
          newPersonalBest
            ? modalState.finishedBest.title
            : modalState.finished.title
        }
        content={
          <View style={styles.modalContent}>
            <Text variant="bodyLarge">
              {newPersonalBest ? "New Best!" : "Best Jump"}
            </Text>
            <Text
              variant="headlineLarge"
              style={{
                color: newPersonalBest
                  ? theme.colors.primary
                  : theme.colors.onBackground,
              }}
            >
              {bestJump.toFixed(0)} in
            </Text>

            <Text variant="bodyLarge">Average Jump:</Text>
            <Text variant="headlineLarge">{averageJump.toFixed(0)} in</Text>
          </View>
        }
      />
      <MyDialog
        visible={isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        title="Confirm Complete"
        content="This workout will be marked as complete"
      >
        <View style={styles.dialogBtnContainer}>
          <Button mode="outlined" onPress={() => setIsDialogVisible(false)}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleFinishTraining}>
            Confirm
          </Button>
        </View>
      </MyDialog>
    </>
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
  modalContent: {
    alignItems: "center",
    flexDirection: "column",
    gap: 12,
  },
  dialogBtnContainer: {
    gap: 12,
    flexDirection: "row",
  },
});
