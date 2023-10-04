import {
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import LogoIcon from "../../../components/logo-icon/LogoIcon";
import { useRouter } from "expo-router";
import FinishSignUp from "./components/FinishSignUp";
import StepTwo from "./components/StepTwo";
import StepOne from "./components/StepOne";
import StepThree from "./components/StepThree";

export default function SignUp() {
  const router = useRouter();
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validLength, setValidLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isSignUpFinished, setIsSignUpFinished] = useState(false);

  const handleSignUp = async () => {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: `${firstName}` });

      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        username: user.displayName,
        firstName: firstName,
        email: email,
      });

      setIsSignUpFinished(true);
      router.replace("/(tabs)");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error while signing up:", errorCode, errorMessage);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!isValidEmail(email)) {
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (validLength && hasUppercase && hasNumber) {
        setStep(3);
      }
    } else if (step === 3) {
      if (isValidName(firstName)) {
        setIsSignUpFinished(true);
        setStep(4);
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isValidName = (name: string) => {
    const trimmedName = name.trim();
    return trimmedName.length >= 2 && trimmedName.length <= 20;
  };

  const checkPasswordRequirements = (password: string) => {
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;

    setValidLength(lengthRegex.test(password));
    setHasUppercase(uppercaseRegex.test(password));
    setHasNumber(numberRegex.test(password));
  };

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.logoContainer}>
        <LogoIcon />
      </View>
      {step === 1 && (
        <StepOne email={email} setEmail={setEmail} title="What is your email" />
      )}
      {step === 2 && (
        <StepTwo
          password={password}
          setPassword={setPassword}
          validLength={validLength}
          hasUppercase={hasUppercase}
          hasNumber={hasNumber}
          checkPasswordRequirements={checkPasswordRequirements}
          title="Now let's set up your password"
        />
      )}
      {step === 3 && (
        <StepThree
          firstName={firstName}
          setFirstName={setFirstName}
          title="What is your first name"
        />
      )}
      {step === 4 && isSignUpFinished && (
        <FinishSignUp title="You're all set, Let's start jumping" />
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={step === 4 ? handleSignUp : handleNextStep}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          {step < 4 ? "Continue" : "Finish Sign Up"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  greeting: {
    textAlign: "center",
    paddingVertical: 12,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 36,
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
