import React, { useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { View, StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import LogoIcon from "../../../components/logo-icon/LogoIcon";
import { useRouter } from "expo-router";
import FinishSignUp from "./components/FinishSignUp";
import SignUpStep from "./components/SignUpStep";

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
  const [errorMessage, setErrorMessage] = useState("");

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

      router.replace("/(tabs)");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error while signing up:", errorCode, errorMessage);
    }
  };

  const handleNextStep = () => {
    let nextStep = step;
    let nextErrorMessage = "";

    if (step === 1) {
      if (!isValidEmail(email)) {
        nextErrorMessage = "Invalid email address";
      }
      nextStep = isValidEmail(email) ? 2 : 1;
    } else if (step === 2) {
      if (!(validLength && hasUppercase && hasNumber)) {
        nextErrorMessage = "Password requirements not met";
      }
      nextStep = validLength && hasUppercase && hasNumber ? 3 : 2;
    } else if (step === 3) {
      if (!isValidName(firstName)) {
        nextErrorMessage = "Invalid first name";
      }
      nextStep = isValidName(firstName) ? 4 : 3;
    }

    setErrorMessage(nextErrorMessage);
    setStep(nextStep);
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrorMessage("");
    } else if (step === 1) {
      router.replace("/(auth)/get-started");
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
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackStep} />
      </Appbar.Header>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}
      >
        <View style={styles.logoContainer}>
          <LogoIcon />
        </View>
        {step === 1 && (
          <SignUpStep
            value={email}
            setValue={setEmail}
            title="What is your email"
            handleNextStep={handleNextStep}
            errorMessage={errorMessage}
          />
        )}
        {step === 2 && (
          <SignUpStep
            value={password}
            setValue={setPassword}
            validLength={validLength}
            hasUppercase={hasUppercase}
            hasNumber={hasNumber}
            checkPasswordRequirements={checkPasswordRequirements}
            title="Now let's set up your password"
            isPasswordStep
            handleNextStep={handleNextStep}
            errorMessage={errorMessage}
          />
        )}
        {step === 3 && (
          <SignUpStep
            value={firstName}
            setValue={setFirstName}
            title="What is your first name"
            handleNextStep={handleNextStep}
            errorMessage={errorMessage}
          />
        )}
        {step === 4 && <FinishSignUp handlePress={handleSignUp} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
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
