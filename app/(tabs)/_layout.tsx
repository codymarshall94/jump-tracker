import { FontAwesome5 } from "@expo/vector-icons";
import { Redirect, Tabs, useRouter } from "expo-router";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useAuthenticatedUser } from "../../contexts/AuthContext";
import { View, Text } from "react-native";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const router = useRouter();
  const { user, loading } = useAuthenticatedUser();

  const theme = useTheme();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating />
      </View>
    );
  }

  if (!user) {
    return router.replace("/(auth)/get-started");
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSecondaryContainer,
        headerTitleStyle: {
          color: theme.colors.onSecondaryContainer,
        },
        headerStyle: {
          backgroundColor: theme.colors.secondaryContainer,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.secondaryContainer,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="train/index"
        options={{
          title: "Train",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="running" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="train/[jump]/index"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: "Track",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chart-bar" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
  },
};
