import { FontAwesome5 } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import { useAuthenticatedUser } from "../../contexts/AuthContext";

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
  const theme = useTheme();

  const { user } = useAuthenticatedUser();

  if (!user) {
    return <Redirect href="/(auth)" />;
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
          title: "Training Session",
          headerTitleAlign: "center",
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
