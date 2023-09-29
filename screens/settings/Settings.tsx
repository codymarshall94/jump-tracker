"use client";

import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider, List, Switch, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const settings = [
  "Edit Profile",
  "Invite Friend",
  "Push Notification",
  "Give Feedback",
  "Help and Support",
  "About Us",
  "Log Out",
];

export default function Settings() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <SafeAreaView>
      <Text style={styles.title} variant="headlineLarge">
        Settings
      </Text>
      <FlatList
        data={settings}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <>
            <View style={styles.listItem}>
              <List.Item title={item} />
              {item === "Push Notification" ? (
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              ) : null}
            </View>
            <Divider />
          </>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 12,
    paddingVertical: 24,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingRight: 12,
  },
});
