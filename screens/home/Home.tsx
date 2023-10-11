import { View } from "react-native";
import { ActivityIndicator, Appbar, Button } from "react-native-paper";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { useSession } from "../../contexts/SessionContext";
import { useAuthenticatedUser } from "../../contexts/AuthContext";
import BestJumps from "./components/best-jumps/BestJumps";
import RecentActivity from "../track/components/recent-activity/RecentActivity";
import { useJumpSessions } from "../../contexts/JumpSessionsContext";

function Home() {
  const { user, userProfile, loading } = useAuthenticatedUser();
  const { jumpSessions } = useJumpSessions();
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
    <>
      <Appbar.Header style={{ justifyContent: "flex-end" }}>
        <Appbar.Action
          icon="cog"
          onPress={() => router.push("/settings/settings")}
        />
      </Appbar.Header>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}
      >
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
        <RecentActivity
          jumpSessions={jumpSessions}
          maxLength={3}
          showName={true}
        />
      </View>
    </>
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
