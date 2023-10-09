import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { DocumentData } from "firebase/firestore";

interface RecentActivityProps {
  jumpSessions: DocumentData[];
  theme: any;
}

export default function RecentActivity({
  jumpSessions,
  theme,
}: RecentActivityProps) {
  return (
    <View>
      <Text variant="labelLarge" style={styles.chartHeader}>
        Recent Activity
      </Text>
      {jumpSessions.length === 0 ? (
        <Text variant="labelMedium" style={{ textAlign: "center" }}>
          No recent activity
        </Text>
      ) : (
        <FlatList
          data={jumpSessions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 24,
                paddingVertical: 12,
                backgroundColor: theme.colors.secondaryContainer,
              }}
            >
              <Text variant="labelMedium">
                {item.date
                  ? item.date.toDate().toDateString()
                  : "Date Not Available"}
              </Text>
              <Text variant="labelMedium">
                {item.bestJump}
                {item.unit}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chartHeader: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
});
