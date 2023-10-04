import { TextInput, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

interface StepOneProps {
  email: string;
  setEmail: (text: string) => void;
  title: string;
}

export default function StepOne({ email, setEmail, title }: StepOneProps) {
  return (
    <>
      <Text style={styles.greeting} variant="headlineLarge">
        {title}
      </Text>
      <TextInput
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
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
