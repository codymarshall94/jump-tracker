import { TextInput, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

interface StepThreeProps {
  firstName: string;
  setFirstName: (text: string) => void;
  title: string;
}

export default function StepThree({
  firstName,
  setFirstName,
  title,
}: StepThreeProps) {
  return (
    <>
      <Text style={styles.greeting} variant="headlineLarge">
        {title}
      </Text>
      <TextInput
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
    </>
  );
}
const styles = StyleSheet.create({
  greeting: {
    textAlign: "center",
    paddingVertical: 12,
  },
});
