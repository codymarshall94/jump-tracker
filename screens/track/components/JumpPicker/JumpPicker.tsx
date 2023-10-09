import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Text, useTheme } from "react-native-paper";
import { JumpTypes } from "../../../../constants/JumpTypes";

interface JumpPickerProps {
  selectedJumpStat: string;
  handleJumpStatChange: (jumpId: string) => void;
}
export default function JumpPicker({
  selectedJumpStat,
  handleJumpStatChange,
}: JumpPickerProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: 24,
        marginBottom: 32,
        marginTop: 12,
        backgroundColor: theme.colors.surface,
      }}
    >
      <Text variant="labelMedium">Select Jump</Text>
      <Picker
        selectedValue={selectedJumpStat}
        onValueChange={(itemValue) => handleJumpStatChange(itemValue)}
        style={{
          height: 50,
          width: "100%",
          color: theme.colors.onSecondaryContainer,
          backgroundColor: theme.colors.secondaryContainer,
        }}
      >
        {Object.entries(JumpTypes).map(([key, value]) => (
          <Picker.Item key={key} label={value} value={key} />
        ))}
      </Picker>
    </View>
  );
}
