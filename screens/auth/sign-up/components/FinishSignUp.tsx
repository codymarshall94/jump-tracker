import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export default function FinishSignUp({
  handlePress,
}: {
  handlePress: () => void;
}) {

  return (
    <View style={{ ...styles.container }}>
      <Text variant="headlineLarge" style={styles.greeting}>
        You are ready to go!
      </Text>
      <Text variant="bodyLarge" style={styles.greeting}>
        Thanks for creating your account with us. Now let's explore the app.
      </Text>
      <Button icon="chevron-double-right" onPress={handlePress}>
        Let's Start
      </Button>
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
