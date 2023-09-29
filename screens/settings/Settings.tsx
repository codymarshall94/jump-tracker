"use client";

import { useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Divider, List, Switch, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { useState } from "react";

export default function Settings() {
  const theme = useTheme();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const settings = [
    "Edit Profile",
    "Invite Friend",
    "Push Notification",
    "Give Feedback",
    "Help and Support",
    "About Us",
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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.onBackground, padding: 12 }} variant="headlineLarge">
        Settings
      </Text>
      <FlatList
        data={settings}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <>
            <View style={styles.listItem}>
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
            </View>
            <Divider />
          </>
        )}
      />
    </SafeAreaView>
  );
}
