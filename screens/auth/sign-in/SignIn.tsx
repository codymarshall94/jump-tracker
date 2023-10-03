import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../config/firebase";
import LogoIcon from "../../../components/logo-icon/LogoIcon";
import { useRouter } from "expo-router";

export default function SignIn() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onHandleSignIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      // const userRef = doc(database, "users", user.uid);
      // await setDoc(userRef, {
      //   displayName: name,
      //   email: email,
      //   uid: user.uid,
      // });
    } catch (error) {
      // Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      {/* Title */}
      <View style={styles.logoContainer}>
        <LogoIcon />
      </View>
      <Text variant="headlineLarge" style={styles.greeting}>
        Welcome Back
      </Text>
      {/* Input Fields */}
      <View style={styles.inputContainer}>
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
      </View>
      <View style={styles.providers}>
        <Text variant="bodyMedium">Sign in with</Text>
        <Button
          mode="contained"
          icon={require("../../../assets/icons/icons8-google-48.png")}
        >
          Google
        </Button>
      </View>
      {/* SignIn Button */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={onHandleSignIn}>
          <Text style={{ color: theme.colors.onPrimary }} variant="bodyMedium">
            Sign In
          </Text>
        </Button>
      </View>
      {/* Navigation to Login Screen */}
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
});
