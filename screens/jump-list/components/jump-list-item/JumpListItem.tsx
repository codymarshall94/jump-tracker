import { useRouter } from "expo-router";
import { Divider, List, useTheme } from "react-native-paper";
import { useSession } from "../../../../contexts/SessionContext";
import { AntDesign } from "@expo/vector-icons";

export default function JumpListItem({
  jumpId,
  jumpName,
  showDialog,
  setSelectedJump,
}: {
  jumpId: string;
  jumpName: string;
  showDialog: () => void;
  setSelectedJump: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const theme = useTheme();
  const { session, setSession } = useSession();

  const handleStartSession = (jumpId: string) => {
    if (session.active && session.workoutPlan?.jumpId !== jumpId) {
      setSelectedJump(jumpId);
      showDialog();
    } else {
      setSession({
        active: true,
        workoutPlan: {
          jumpId,
          jumpName,
        },
      });
      router.push(`/train/${jumpId}`);
    }
  };

  return (
    <>
      <List.Item
        onPress={() => handleStartSession(jumpId)}
        title={jumpName}
        right={() => (
          <AntDesign
            name="rightcircleo"
            size={24}
            color={theme.colors.onPrimaryContainer}
          />
        )}
      />
      <Divider />
    </>
  );
}
