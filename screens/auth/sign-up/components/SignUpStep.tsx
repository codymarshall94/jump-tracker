import { View, StyleSheet } from "react-native";
import {
  Button,
  useTheme,
  Text,
  TextInput,
  Checkbox,
} from "react-native-paper";

interface StepProps {
  value: string;
  setValue: (text: string) => void;
  title: string;
  isPasswordStep?: boolean;
  validLength?: boolean;
  hasUppercase?: boolean;
  hasNumber?: boolean;
  checkPasswordRequirements?: (password: string) => void;
  handleNextStep: () => void;
  errorMessage?: string;
}

export default function SignUpStep({
  value,
  setValue,
  title,
  isPasswordStep = false,
  validLength,
  hasUppercase,
  hasNumber,
  checkPasswordRequirements,
  handleNextStep,
  errorMessage,
}: StepProps) {

  return (
    <>
      <Text style={styles.stepDesciption} variant="headlineLarge">
        {title}
      </Text>
      <TextInput
        placeholder={`Enter your ${isPasswordStep ? "password" : "email"}`}
        autoCapitalize={isPasswordStep ? "none" : "sentences"}
        autoCorrect={!isPasswordStep}
        secureTextEntry={isPasswordStep}
        keyboardType={isPasswordStep ? "default" : "email-address"}
        textContentType={isPasswordStep ? "password" : "emailAddress"}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (isPasswordStep && checkPasswordRequirements) {
            checkPasswordRequirements(text);
          }
        }}
        error={!!errorMessage}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {isPasswordStep && (
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
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleNextStep}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Continue
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  stepDesciption: {
    textAlign: "center",
    paddingVertical: 12,
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  passwordRequirements: {
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    paddingVertical: 24,
  },
  button: {
    paddingVertical: 10,
    marginVertical: 24,
    marginHorizontal: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
