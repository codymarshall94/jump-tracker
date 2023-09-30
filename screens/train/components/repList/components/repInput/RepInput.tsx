import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Checkbox, Text } from "react-native-paper";

interface JumpAttempt {
  id: number;
  feet: string;
  inches: string;
  completed: boolean;
}

interface RepInputProps {
  id: number;
  attempt: JumpAttempt;
  maxInputLength: number;
  onInputChange: (id: number, feet: string, inches: string) => void;
  onCheckboxChange: (id: number, checked: boolean) => void;
}

export default function RepInput({
  id,
  attempt,
  maxInputLength,
  onInputChange,
  onCheckboxChange,
}: RepInputProps) {
  return (
    <View style={styles.attempt}>
      <Text variant="labelLarge">{id + 1}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={attempt.feet}
          onChangeText={(text) => onInputChange(id, text, attempt.inches)}
          style={styles.inputField}
          keyboardType="numeric"
          maxLength={maxInputLength}
        />
        <Text style={styles.inputSeparator}>ft</Text>
        <TextInput
          mode="outlined"
          value={attempt.inches}
          onChangeText={(text) => onInputChange(id, attempt.feet, text)}
          style={styles.inputField}
          keyboardType="numeric"
          maxLength={maxInputLength}
        />
        <Text style={styles.inputSeparator}>in</Text>
        <Checkbox
          status={attempt.completed ? "checked" : "unchecked"}
          onPress={() => onCheckboxChange(id, !attempt.completed)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  attempt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    width: 50,
    height: 50,
  },
  inputSeparator: {
    paddingHorizontal: 8,
  },
});
