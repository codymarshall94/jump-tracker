import { View, StyleSheet } from "react-native";
import { useTheme, Text, IconButton } from "react-native-paper";

const EmptyState = ({ message }: any) => {
  const theme = useTheme();

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <IconButton icon="file-hidden" size={48} />
      <Text variant="bodyMedium" style={{ color: theme.colors.onBackground }}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default EmptyState;
