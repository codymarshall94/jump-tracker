import React from "react";
import { View } from "react-native";
import { Avatar, Button, Divider, List } from "react-native-paper";
import { Text, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { useUserProfile } from "../../contexts/UserContext";
import LineChart from "../../components/line-chart/LineChart";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function Home() {
  const { userProfile } = useUserProfile();
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.avatarContainer}>
        <Link href="/settings">
          <Avatar.Icon size={42} icon="account" />
        </Link>
      </View>
      <Text variant="headlineLarge" style={styles.greeting}>
        Good Morning, {userProfile?.firstName}
      </Text>
      <Text variant="bodyLarge" style={styles.subText}>
        Stay on track and keep progressing
      </Text>
      <View style={styles.btnContainer}>
        <Button mode="contained">Continue training</Button>
      </View>
      <View>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Top Jumps
        </Text>
        <View>
          <FlatList
            data={userProfile?.bestJumps}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <>
                <List.Item
                  title={item.name}
                  style={{
                    backgroundColor: theme.colors.onSecondary,
                    paddingHorizontal: 12,
                  }}
                  left={() => <List.Icon icon="shoe-sneaker" />}
                  right={() => (
                    <Text variant="labelLarge">{item.distance} in</Text>
                  )}
                />
                <Divider />
              </>
            )}
          />
        </View>
      </View>
      <View>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Recent Jumps
        </Text>
      </View>
      <LineChart />
    </SafeAreaView>
  );
}

export default Home;

const styles = {
  container: {
    flex: 1,
  },
  avatarContainer: {
    padding: 12,
  },
  btnContainer: {
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    paddingLeft: 12,
    paddingVertical: 12,
  },
  greeting: {
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  subText: {
    paddingHorizontal: 12,
  },
};
