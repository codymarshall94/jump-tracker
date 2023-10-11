import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../../../components/logo-icon/LogoIcon";
import { Link, useRouter } from "expo-router";
import { auth } from "../../../config/firebase";

export default function SignIn() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignIn = () => {
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Welcome ${user.displayName}`);
        router.replace("/(tabs)");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.logoContainer}>
        <LogoIcon />
      </View>
      <Text variant="headlineLarge" style={styles.greeting}>
        Welcome Back
      </Text>

      <View style={styles.inputContainer}>
        {error && (
          <Text variant="bodyMedium" style={styles.error}>
            {error}
          </Text>
        )}
        <TextInput
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          showSoftInputOnFocus={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Link href="/(auth)/forgot-password">
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onBackground }}
          >
            Forgot Password?
          </Text>
        </Link>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSignIn}>
          <Text style={{ color: theme.colors.onPrimary }} variant="bodyMedium">
            Sign In
          </Text>
        </Button>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
          Don't have an account?
        </Text>
        <Button onPress={() => router.push("/(auth)/sign-up")}>
          <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
            Sign Up
          </Text>
        </Button>
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
  greeting: {
    textAlign: "center",
    paddingVertical: 12,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 36,
  },
  inputContainer: {
    gap: 12,
  },
  providers: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 24,
  },
  buttonContainer: {
    paddingVertical: 24,
  },
  error: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});
