import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SessionProvider } from "../contexts/SessionContext";
import { AuthenticatedUserProvider } from "../contexts/AuthContext";
import { JumpSessionsProvider } from "../contexts/JumpSessionsContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.otf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AuthenticatedUserProvider>
      <JumpSessionsProvider>
        <SessionProvider>
          <PaperProvider>
            <Slot />
          </PaperProvider>
        </SessionProvider>
      </JumpSessionsProvider>
    </AuthenticatedUserProvider>
  );
}
