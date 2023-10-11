import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Checkbox,
  Text,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import { SessionAttempt } from "../../../../../../types/session";

interface RepInputProps {
  id: number;
  attempt: SessionAttempt;
  maxInputLength: number;
  onInputChange: (id: number, feet: string, inches: string) => void;
  onCheckboxChange: (id: number, checked: boolean) => void;
  onDelete: (id: number) => void;
}

const limitInput = ({
  value,
  min = 0,
  max = 100,
  callback,
}: {
  value: string | number;
  min?: number;
  max?: number;
  callback: (value: string) => void;
}) => {
  if (value === "") {
    callback("");
    return;
  }

  const normalized = Number(value);

  if (!isNaN(normalized) && normalized >= min && normalized <= max) {
    callback(String(normalized));
  }
};

export default function RepInput({
  id,
  attempt,
  maxInputLength,
  onInputChange,
  onCheckboxChange,
  onDelete,
}: RepInputProps) {
  return (
    <View style={styles.attempt}>
      <Text variant="labelLarge">{id + 1}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={attempt.feet}
          onChangeText={(text) =>
            limitInput({
              value: text,
              max: 30,
              callback: (value) =>
                onInputChange(id, String(value), attempt.inches),
            })
          }
          style={styles.inputField}
          keyboardType="numeric"
        />
        <Text style={styles.inputSeparator}>ft</Text>
        <TextInput
          mode="outlined"
          value={attempt.inches}
          onChangeText={(text) =>
            limitInput({
              value: text,
              max: 12,
              callback: (value) =>
                onInputChange(id, attempt.feet, String(value)),
            })
          }
          style={styles.inputField}
          keyboardType="numeric"
          maxLength={maxInputLength}
        />
        <Text style={styles.inputSeparator}>in</Text>
        <Checkbox
          status={attempt.completed ? "checked" : "unchecked"}
          onPress={() => onCheckboxChange(id, !attempt.completed)}
        />
        <IconButton icon="delete" iconColor={MD3Colors.error40} onPress={() => onDelete(id)} />
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
  deleteButton: {
    color: "red", // Style the delete button as needed
  },
});
