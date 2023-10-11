"use client";

import { Appbar, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Divider, List, Switch } from "react-native-paper";
import { StyleSheet, Pressable, View } from "react-native";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthenticatedUser } from "../../contexts/AuthContext";

export default function Settings() {
  const theme = useTheme();
  const router = useRouter();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { setUserProfile } = useAuthenticatedUser();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("sessions");
    signOut(auth)
      .then(() => {
        setUserProfile(null);
        router.push("/(auth)/get-started");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error while signing out:", errorCode, errorMessage);
      });
  };

  const settings = [
    "Edit Profile",
    "Give Feedback",
    "Help and Support",
    "Log Out",
  ];

  const styles = StyleSheet.create({
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingRight: 12,
      marginHorizontal: 12,
    },
  });

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.secondaryContainer,
        }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <FlatList
          data={settings}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <>
              <Pressable
                style={styles.listItem}
                onPress={item === "Log Out" ? handleSignOut : null}
              >
                <List.Item
                  title={item}
                  style={{ backgroundColor: theme.colors.surface }}
                />
                {item === "Push Notification" ? (
                  <Switch
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    color={theme.colors.primary}
                  />
                ) : null}
              </Pressable>
              <Divider />
            </>
          )}
        />
      </View>
    </>
  );
}
