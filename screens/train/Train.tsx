import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import RepList from "./components/repList/RepList";
import { useRouter } from "expo-router";
import { useSession } from "../../contexts/SessionContext";

interface JumpAttempt {
  id: number;
  feet: string;
  inches: string;
  completed: boolean;
}

const initialJumpAttempts = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  feet: "",
  inches: "",
  completed: false,
}));

export default function Train() {
  const router = useRouter();
  const { session, setSession } = useSession();
  const theme = useTheme();
  const maxInputLength = 3;
  const [jumpAttempts, setJumpAttempts] =
    useState<JumpAttempt[]>(initialJumpAttempts);

  const handleAddJumpRep = () => {
    setJumpAttempts((prevAttempts) => [
      ...prevAttempts,
      {
        id: jumpAttempts.length,
        feet: "",
        inches: "",
        completed: false,
      },
    ]);
  };

  const handleCompleteRep = (id: number, checked: boolean) => {
    setJumpAttempts((prevAttempts) =>
      prevAttempts.map((rep) =>
        rep.id === id ? { ...rep, completed: checked } : rep
      )
    );
  };

  const handleRepInput = (id: number, feet: string, inches: string) => {
    const feetValue = parseFloat(feet) || 0;
    const inchesValue = parseFloat(inches) || 0;

    if (
      feetValue >= 0 &&
      feetValue <= 30 &&
      inchesValue >= 0 &&
      inchesValue < 12
    ) {
      const totalDistance = feetValue + inchesValue / 12;

      setJumpAttempts((prevAttempts) =>
        prevAttempts.map((rep) =>
          rep.id === id
            ? {
                ...rep,
                feet: feet,
                inches: inches,
                completed: !isNaN(totalDistance),
              }
            : rep
        )
      );
    }
  };

  const handleFinishTraining = () => {};

  const handleCancelTraining = () => {
    if (session.active) {
      setJumpAttempts(initialJumpAttempts);
      setSession({
        active: false,
        workoutPlan: null,
      });
    }
    router.push("/");
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text style={{ ...styles.title, color: theme.colors.onBackground }}>
        {session.workoutPlan?.jumpName}
      </Text>
      <View style={styles.attemptsContainer}>
        <RepList
          jumpAttempts={jumpAttempts}
          maxInputLength={maxInputLength}
          onRepInput={handleRepInput}
          onCheckboxChange={handleCompleteRep}
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
