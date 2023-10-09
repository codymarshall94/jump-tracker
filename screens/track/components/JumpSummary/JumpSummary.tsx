import { View, StyleSheet } from "react-native";
import JumpMetric from "./components/JumpMetric/JumpMetric";

interface JumpSummaryProps {
  totalSessions: number | undefined;
  totalJumps: number | undefined;
  bestJump: number;
  unit: string;
  average: number | undefined;
}

export default function JumpSummary({
  totalSessions,
  totalJumps,
  bestJump,
  unit,
  average,
}: JumpSummaryProps) {
  return (
    <View style={styles.row}>
      <JumpMetric label="Sessions" value={totalSessions || "N/A"} />
      <JumpMetric label="Jumps" value={totalJumps || "N/A"} />
      <JumpMetric label="Best" value={bestJump + unit || "N/A"} />
      <JumpMetric label="Average" value={average || "N/A"} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 32,
  },
});
