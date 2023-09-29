import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import RepList from "./components/repList/RepList";

interface JumpAttempt {
  id: number;
  attempt: string;
  completed: boolean;
}

const initialJumpAttempts = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  attempt: "",
  completed: false,
}));

export default function Train() {
  const theme = useTheme();
  const maxInputLength = 3;
  const [jumpAttempts, setJumpAttempts] =
    useState<JumpAttempt[]>(initialJumpAttempts);

  const handleAddJumpRep = () => {
    setJumpAttempts((prevAttempts) => [
      ...prevAttempts,
      {
        id: jumpAttempts.length,
        attempt: "",
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

  const handleRepInput = (id: number, jumpDistance: string) => {
    const numericValue = parseFloat(jumpDistance);

    setJumpAttempts((prevAttempts) =>
      prevAttempts.map((rep) =>
        rep.id === id
          ? {
              ...rep,
              attempt: isNaN(numericValue) ? "" : numericValue.toString(),
              completed: !isNaN(numericValue),
            }
          : rep
      )
    );
  };

  const handleFinishTraining = () => {};

  const handleCancelTraining = () => {
    setJumpAttempts(initialJumpAttempts);
  };

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text style={{ ...styles.title, color: theme.colors.onBackground }}>
        Broad Jump
      </Text>
      <View style={styles.attemptsContainer}>
        <View style={styles.attemptsHeader}>
          <Text style={styles.attemptsHeaderText}>Rep</Text>
          <Text style={styles.attemptsHeaderText}>Inches</Text>
        </View>
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
    </ScrollView>
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
  attemptsHeader: {
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#CCD8E2",
  },
  attemptsHeaderText: {
    color: "#A3A4A6",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12,
    marginVertical: 8,
  },
});
