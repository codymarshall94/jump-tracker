import { useRouter } from "expo-router";
import { Button, Divider, List, useTheme } from "react-native-paper";
import { useSession } from "../../../../contexts/SessionContext";
import { AntDesign } from "@expo/vector-icons";

const initialJumpAttempts = Array.from({ length: 5 }, (_, index) => ({
  attemptId: index,
  feet: "",
  inches: "",
  completed: false,
}));

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
          attempts: initialJumpAttempts,
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
        right={() =>
          session.active && session.workoutPlan?.jumpId === jumpId ? (
            <Button mode="outlined">Continue</Button>
          ) : (
            <AntDesign
              name="rightcircleo"
              size={24}
              color={theme.colors.onPrimaryContainer}
            />
          )
        }
      />
      <Divider />
    </>
  );
}
