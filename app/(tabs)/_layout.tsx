import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { Text } from "react-native-paper";

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
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
        name="train"
        options={{
          title: "Training Session",
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable>
              <Text
                style={{
                  marginRight: 12,
                  color: "#6B4FAA",
                  fontWeight: "bold",
                }}
                variant="bodyLarge"
              >
                Finish
              </Text>
            </Pressable>
          ),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="running" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
