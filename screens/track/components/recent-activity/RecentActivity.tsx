import { View, FlatList } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import { DocumentData } from "firebase/firestore";
import EmptyState from "../../../../components/empty-state/EmptyState";

interface RecentActivityProps {
  jumpSessions: DocumentData[];
  maxLength?: number;
  showName?: boolean;
}

export default function RecentActivity({
  jumpSessions,
  maxLength = 20,
  showName = false,
}: RecentActivityProps) {
  const theme = useTheme();
  const limitedJumpSessions = jumpSessions.slice(0, maxLength);

  return (
    <View>
      {limitedJumpSessions.length === 0 ? (
        <EmptyState message="No Recent Jumps" />
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 24,
              paddingVertical: 12,
              backgroundColor: theme.colors.secondaryContainer,
            }}
          >
            <Text variant="labelMedium" style={{ flex: 1, textAlign: "left" }}>
              Date
            </Text>
            {showName && (
              <Text
                variant="labelMedium"
                style={{ flex: 1, textAlign: "left" }}
              >
                Jump Name
              </Text>
            )}
            <Text variant="labelMedium" style={{ flex: 1, textAlign: "right" }}>
              Best Jump
            </Text>
          </View>
          <FlatList
            data={limitedJumpSessions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    backgroundColor: theme.colors.secondaryContainer,
                  }}
                >
                  <Text
                    variant="labelLarge"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    {item.date
                      ? item.date.toDate().toDateString()
                      : "Date Not Available"}
                  </Text>
                  {showName && (
                    <Text
                      variant="labelLarge"
                      style={{ flex: 1, textAlign: "left" }}
                    >
                      {item.jumpName}
                    </Text>
                  )}
                  <Text
                    variant="labelLarge"
                    style={{ flex: 1, textAlign: "right" }}
                  >
                    {item.bestJump}
                    {item.unit}
                  </Text>
                </View>
                <Divider
                  style={{ backgroundColor: theme.colors.onSecondaryContainer }}
                />
              </>
            )}
          />
        </View>
      )}
    </View>
  );
}
