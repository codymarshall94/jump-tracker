import { View, FlatList } from "react-native";
import { Divider, List, Text, useTheme } from "react-native-paper";
import EmptyState from "../../../../components/empty-state/EmptyState";

export default function BestJumps({ data }: any) {
  const theme = useTheme();
  return (
    <View>
      {!data || data.length === 0 ? (
        <EmptyState message="Track a jump to view it here" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.jumpName}
          renderItem={({ item }) => (
            <>
              <List.Item
                title={item.jumpName}
                style={{
                  backgroundColor: theme.colors.onSecondary,
                  paddingHorizontal: 12,
                }}
                left={() => <List.Icon icon="shoe-sneaker" />}
                right={() => (
                  <Text variant="labelLarge">{item.distance} in</Text>
                )}
              />
              <Divider />
            </>
          )}
        />
      )}
    </View>
  );
}
