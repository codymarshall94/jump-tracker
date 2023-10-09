import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthenticatedUser } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import JumpPicker from "./components/JumpPicker/JumpPicker";
import JumpSummary from "./components/JumpSummary/JumpSummary";
import RecentActivity from "./components/recent-activity/RecentActivity";

const screenWidth = Dimensions.get("window").width;

export default function Track() {
  const theme = useTheme();
  const { userProfile, user } = useAuthenticatedUser();
  const [selectedJumpStat, setSelectedJumpStat] = useState("broad_jump");
  const [jumpSessions, setJumpSessions] = useState<DocumentData[]>([]);

  const handleJumpStatChange = (jumpId: string) => {
    setSelectedJumpStat(jumpId);
  };

  if (!userProfile || !user) {
    return null;
  }

  const userDocRef = doc(db, "users", user?.uid);

  const q = query(
    collection(userDocRef, "jumpSessions"),
    where("jumpId", "==", selectedJumpStat)
  );

  const fetchJumpSessions = async () => {
    const querySnapshot = await getDocs(q);
    const sessions = querySnapshot.docs.map((doc) => doc.data());
    if (sessions.length > 0) {
      sessions.sort((a, b) => b.date.toDate() - a.date.toDate());
    }

    setJumpSessions(sessions);
  };

  useEffect(() => {
    fetchJumpSessions();
  }, [selectedJumpStat]);

  const jumpStats = userProfile?.jumps.find(
    (jump) => jump.jumpId === selectedJumpStat
  );

  if (!jumpStats) {
    return null;
  }

  const { totalSessions, totalJumps, bestJump, unit, average } = jumpStats;

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="ANALYTICS" style={{ alignItems: "center" }} />
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
        <JumpSummary
          totalSessions={totalSessions}
          totalJumps={totalJumps}
          bestJump={bestJump}
          unit={unit}
          average={average}
        />
        <RecentActivity jumpSessions={jumpSessions} theme={theme} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
