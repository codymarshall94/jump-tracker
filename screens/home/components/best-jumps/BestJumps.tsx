import { View, FlatList } from "react-native";
import { Divider, List, Text, useTheme } from "react-native-paper";
import EmptyState from "../../../../components/empty-state/EmptyState";

export default function BestJumps({ data }: any) {
  const theme = useTheme();

  const limitedData = data ? data.slice(0, 3) : [];

  return (
    <View>
      {!limitedData || limitedData.length === 0 ? (
        <EmptyState message="No Jumps Tracked" />
      ) : (
        <FlatList
          data={limitedData}
          keyExtractor={(item) => item.jumpName}
          renderItem={({ item }) => (
            <>
              <List.Item
                title={item.jumpName}
                style={{
                  backgroundColor: theme.colors.secondaryContainer,
                  paddingHorizontal: 12,
                }}
                left={() => <List.Icon icon="shoe-sneaker" />}
                right={() => (
                  <Text variant="labelLarge">
                    {item.bestJump}
                    {item.unit}
                  </Text>
                )}
              />
              <Divider style={{ backgroundColor: theme.colors.onSecondaryContainer }} />
            </>
          )}
        />
      )}
    </View>
  );
}
