import { View, StyleSheet } from "react-native";
import { TextInput, Checkbox, Text } from "react-native-paper";

interface JumpAttempt {
  id: number;
  attempt: string;
  completed: boolean;
}

interface RepInputProps {
  id: number;
  attempt: JumpAttempt;
  maxInputLength: number;
  onInputChange: (id: number, jumpDistance: string) => void;
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
          value={attempt.attempt}
          onChangeText={(text) => onInputChange(id, text)}
          style={styles.attemptInput}
          keyboardType="numeric"
          maxLength={maxInputLength}
        />
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
  },
  attemptInput: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
