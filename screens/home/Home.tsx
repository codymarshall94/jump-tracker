import { View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Divider,
  List,
} from "react-native-paper";
import { Text, useTheme } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import LineChart from "../../components/line-chart/LineChart";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../contexts/SessionContext";
import { useAuthenticatedUser } from "../../contexts/AuthContext";
import BestJumps from "./components/best-jumps/BestJumps";

function Home() {
  const { user, userProfile, loading } = useAuthenticatedUser();
  const { session } = useSession();
  const router = useRouter();
  const theme = useTheme();

  if (!userProfile && loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating />
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

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Top Jumps
      </Text>
      <BestJumps data={userProfile?.jumps} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Recent Jumps
      </Text>

      {/* <LineChart /> */}
    </SafeAreaView>
  );
}

export default Home;

const styles = {
  container: {
    flex: 1,
  },
  loadingContainer: {
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
