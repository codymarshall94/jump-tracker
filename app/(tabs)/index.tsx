import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import { Avatar, Button, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

const threeBestJumps = [
  {
    name: "Broad",
    best: 69,
    unit: "in",
  },
  {
    name: "Vertical",
    best: 42,
    unit: "in",
  },
  {
    name: "High",
    best: 106,
    unit: "in",
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Icon icon="account" />
      </View>
      <Text variant="headlineLarge" style={styles.title}>
        Good Morning, User
      </Text>
      <Text variant="bodyLarge">Stay on track and keep progressing</Text>
      <View style={styles.btnContainer}>
        <Button mode="contained">Continue training</Button>
      </View>
      <View style={styles.contentContainer}>
        <Text variant="titleMedium" style={styles.contentTitle}>
          Top Jumps
        </Text>
        <View style={styles.content}>
          <FlatList
            data={threeBestJumps}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                style={styles.listItem}
                left={() => <List.Icon icon="shoe-sneaker" />}
                right={() => (
                  <Text>
                    {item.best} {item.unit}
                  </Text>
                )}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#F4F6FA",
  },
  avatarContainer: {
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  btnContainer: {
    paddingVertical: 24,
  },
  contentContainer: {
    marginTop: 12,
    padding: 12,
  },
  contentTitle: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  content: {
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 12,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
});
