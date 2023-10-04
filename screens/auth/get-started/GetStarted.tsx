import { Link, useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "../../../components/logo-icon/LogoIcon";

export default function GetStarted() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.logoIconContainer}>
        <LogoIcon />
      </View>
      <Text variant="headlineLarge" style={{ color: theme.colors.primary }}>
        Welcome to Jumper
      </Text>
      <Text variant="bodyLarge">The best Jump Testing application</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/get-started.png")}
        />
      </View>
      <Button
        style={styles.button}
        labelStyle={styles.buttonLabel}
        mode="contained"
        onPress={() => router.push("/(auth)/sign-up")}
      >
        Get Started
      </Button>
      <View style={styles.bottomText}>
        <Text variant="bodySmall">Already have an account?</Text>
        <Link
          style={{ ...styles.link, color: theme.colors.primary }}
          href="/(auth)/sign-in"
        >
          Sign in
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  logoIconContainer: {
    alignItems: "center",
    paddingVertical: 36,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 24,
  },
  image: {
    width: 200,
    height: 200,
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
  bottomText: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  link: {
    paddingLeft: 8,
    fontWeight: "bold",
  },
});
