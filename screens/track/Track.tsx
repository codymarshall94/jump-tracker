import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { useAuthenticatedUser } from "../../contexts/AuthContext";

import JumpPicker from "./components/JumpPicker/JumpPicker";
import JumpSummary from "./components/JumpSummary/JumpSummary";
import RecentActivity from "./components/recent-activity/RecentActivity";
import EmptyState from "../../components/empty-state/EmptyState";
import { useJumpSessions } from "../../contexts/JumpSessionsContext";

export default function Track() {
  const theme = useTheme();
  const { userProfile } = useAuthenticatedUser();
  const [selectedJumpStat, setSelectedJumpStat] = useState("broad_jump");
  const { jumpSessions } = useJumpSessions();

  const handleJumpStatChange = (jumpId: string) => {
    setSelectedJumpStat(jumpId);
  };

  const jumpStats = userProfile?.jumps.find(
    (jump) => jump.jumpId === selectedJumpStat
  );

  const sortedJumpSessions = jumpSessions
    .filter((session) => session.jumpId === selectedJumpStat)
    .sort((a, b) => b.date.toDate() - a.date.toDate());

  return (
    <>
      <Appbar.Header style={{ backgroundColor: theme.colors.secondaryContainer }}>
        <Appbar.Content title="Jump Stats" style={{ alignItems: "center" }} />
      </Appbar.Header>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}
      >
        <JumpPicker
          selectedJumpStat={selectedJumpStat}
          handleJumpStatChange={handleJumpStatChange}
        />
        {jumpStats ? (
          <JumpSummary
            totalSessions={jumpStats.totalSessions}
            totalJumps={jumpStats.totalJumps}
            bestJump={jumpStats.bestJump}
            unit={jumpStats.unit}
            average={jumpStats.average}
          />
        ) : null}
        {jumpSessions.length > 0 ? (
          <RecentActivity jumpSessions={sortedJumpSessions} />
        ) : (
          <EmptyState message="No recent activity." />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
