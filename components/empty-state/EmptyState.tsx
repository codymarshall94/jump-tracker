import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const EmptyState = ({ message }: any) => {
  const theme = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.secondaryContainer,
      }}
    >
      <Text style={{ color: theme.colors.onBackground, fontSize: 16 }}>
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
