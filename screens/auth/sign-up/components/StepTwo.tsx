import { View, StyleSheet } from "react-native";
import { TextInput, Checkbox, Text } from "react-native-paper";

interface StepTwoProps {
  password: string;
  setPassword: (text: string) => void;
  validLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  checkPasswordRequirements: (password: string) => void;
  title: string;
}

export default function StepTwo({
  password,
  setPassword,
  validLength,
  hasUppercase,
  hasNumber,
  checkPasswordRequirements,
  title,
}: StepTwoProps) {
  return (
    <>
      <Text style={styles.greeting} variant="headlineLarge">
        {title}
      </Text>
      <TextInput
        placeholder="Enter your password"
        editable={true}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          checkPasswordRequirements(text);
        }}
      />
      <View style={styles.passwordRequirements}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={validLength ? "checked" : "unchecked"}
            onPress={() => {}}
          />
          <Text>At least 8 characters</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={hasUppercase ? "checked" : "unchecked"}
            onPress={() => {}}
          />
          <Text>At least 1 uppercase letter</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={hasNumber ? "checked" : "unchecked"}
            onPress={() => {}}
          />
          <Text>At least 1 number</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  greeting: {
    textAlign: "center",
    paddingVertical: 12,
  },
  passwordRequirements: {
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
