import React from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider, Text, useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { JumpTypes } from "../../constants/JumpTypes";

function JumpListItem({ item }: { item: string }) {
  const theme = useTheme();
  return (
    <>
      <View style={styles.listItem}>
        <Text variant="bodyLarge" style={{ flexGrow: 1 }}>
          {item}
        </Text>
        <Link href={`/train/${item}`}>
          <AntDesign name="rightcircleo" size={24} color={theme.colors.onPrimaryContainer} />
        </Link>
      </View>
      <Divider />
    </>
  );
}

export default function Jumps() {
  const theme = useTheme();
  const jumpsArray = Object.values(JumpTypes);

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.listContainer}>
        <FlatList
          data={jumpsArray}
          renderItem={({ item }) => <JumpListItem item={item} />}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 12,
    flexGrow: 1,
  },
});
