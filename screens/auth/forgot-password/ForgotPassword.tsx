import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import LogoIcon from "../../../components/logo-icon/LogoIcon";

export default function ForgotPassword() {
  const theme = useTheme();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleForgotPassword = () => {
    setMessage("");
    setError("");
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setMessage("Password reset email sent. Check your inbox.");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              setError("Please provide a valid email");
              break;
            default:
              break;
          }
        });
    } else {
      setError(
        "Please enter your email address before requesting a password reset."
      );
    }
  };

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.formContainer}>
        <Text variant="headlineLarge" style={styles.title}>
          Forgot Password
        </Text>
        <Text style={styles.subtitle}>
          Enter your email to reset your password:
        </Text>
        <TextInput
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={error ? true : false}
        />
        <Button
          mode="contained"
          onPress={handleForgotPassword}
          style={styles.button}
        >
          Reset Password
        </Button>
        {message && <Text variant="bodyMedium" style={styles.message}>{message}</Text>}
        {error && <Text variant="bodyMedium" style={styles.error}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    paddingVertical: 12,
  },
  subtitle: {
    textAlign: "center",
    paddingBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  message: {
    marginTop: 10,
    color: "green",
    textAlign: "center",
  },
  error: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});
