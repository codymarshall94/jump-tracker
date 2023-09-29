import { StyleSheet, Dimensions } from "react-native";
import { View } from "../../components/Themed";
import { Text } from "react-native-paper";
import LineChart from "../../components/line-chart/LineChart";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function Track() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Broad Jump
      </Text>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <MaterialCommunityIcons name="shoe-sneaker" size={32} color="black" />

          <Text variant="labelLarge" style={styles.sessionAmount}>
            105
          </Text>
          <Text variant="labelMedium">Sessions</Text>
        </View>
      </View>
      <View style={styles.totals}>
        <View style={styles.best}>
          <Text variant="bodyLarge">73</Text>
          <Text variant="labelLarge">
            Best Jump
          </Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.average}>
          <Text variant="bodyLarge">68</Text>
          <Text variant="labelLarge" >
            Average Jump
          </Text>
        </View>
      </View>
      <Text variant="labelLarge" style={styles.chartHeader}>
        Recent Activity
      </Text>
      <LineChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },
  title: {
    textAlign: "center",
    color: "#6B4FAA",
    fontWeight: "bold",
    paddingVertical: 12,
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 150,
    width: 150,
    borderWidth: 8,
    borderColor: "#6B4FAA",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  sessionAmount: {
    fontWeight: "bold",
  },
  totals: {
    position: "relative",
    marginVertical: 42,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verticalDivider: {
    height: 50,
    width: 1,
    backgroundColor: "#BBBDD0",
    position: "absolute",
    left: screenWidth / 2,
  },
  best: {
    alignItems: "flex-start",
  },
  average: {
    alignItems: "flex-end",
  },
  chartHeader: {
    paddingLeft: 24,
    paddingVertical: 12,
    fontWeight: "bold",
  },
});
