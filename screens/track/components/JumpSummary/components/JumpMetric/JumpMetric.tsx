import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface JumpMetricProps {
  label: string;
  value: string | number;
}

export default function JumpMetric({ label, value }: JumpMetricProps) {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">{value}</Text>
      <Text variant="labelLarge">{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
