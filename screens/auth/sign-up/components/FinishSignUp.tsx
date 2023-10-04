import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function FinishSignUp({ title }: { title: string }) {
  const theme = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text variant="headlineLarge" style={styles.greeting}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  greeting: {
    textAlign: "center",
    paddingVertical: 12,
  },
});
