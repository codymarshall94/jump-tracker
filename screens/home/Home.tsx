import { View } from "react-native";
import { Avatar, Button, Divider, List } from "react-native-paper";
import { Text, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import LineChart from "../../components/line-chart/LineChart";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../contexts/SessionContext";
import { useAuthenticatedUser } from "../../contexts/AuthContext";

function Home() {
  const { user, userProfile, loading } = useAuthenticatedUser();
  const { session } = useSession();
  const router = useRouter();
  const theme = useTheme();

  if (!userProfile && loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.avatarContainer}>
        <Link href="/settings/settings">
          <Avatar.Icon size={42} icon="account" />
        </Link>
      </View>
      <Text variant="headlineLarge" style={styles.greeting}>
        Good Morning, {user?.displayName}
      </Text>
      <Text variant="bodyLarge" style={styles.subText}>
        Stay on track and keep progressing
      </Text>
      <View style={styles.btnContainer}>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() =>
            router.push(
              session.active
                ? `/train/${session.workoutPlan?.jumpId}`
                : "/train"
            )
          }
        >
          {session.active ? "Continue Session" : "Start A New Session"}
        </Button>
      </View>
      <View>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Top Jumps
        </Text>
        <View>
          <FlatList
            data={userProfile?.bestJumps}
            keyExtractor={(item) => item.jumpName}
            renderItem={({ item }) => (
              <>
                <List.Item
                  title={item.jumpName}
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
  button: {
    paddingVertical: 10,
    marginHorizontal: 12,
  },
  buttonLabel: {},
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
