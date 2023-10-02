import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useTheme, Text, Button } from "react-native-paper";
import { JumpTypes } from "../../constants/JumpTypes";
import { useRouter } from "expo-router";
import { useSession } from "../../contexts/SessionContext";
import MyDialog from "../../components/dialog/MyDialog";
import JumpListItem from "./components/jump-list-item/JumpListItem";

export default function JumpList() {
  const router = useRouter();
  const theme = useTheme();
  const { session, setSession } = useSession();
  const [selectedJump, setSelectedJump] = useState<string>("");
  const jumpTypeArray = Object.entries(JumpTypes).map(([jumpId, name]) => ({
    jumpId,
    name,
  }));
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const continueSession = () => {
    router.push(`/train/${session.workoutPlan?.jumpId}`);
    hideDialog();
  };

  const startNewSession = () => {
    const selectedJumpData = {
      jumpId: selectedJump,
      jumpName: JumpTypes[selectedJump as keyof typeof JumpTypes],
      attempts: [],
    };

    setSession({
      active: true,
      workoutPlan: selectedJumpData,
    });

    router.push(`/train/${selectedJump}`);
    hideDialog();
  };

  const cancel = () => {
    hideDialog();
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.headingContainer}>
        <Text variant="headlineSmall" style={{ textAlign: "center" }}>
          Select a jump to start a new session
        </Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={jumpTypeArray}
          renderItem={({ item }) => (
            <JumpListItem
              jumpId={item.jumpId}
              jumpName={item.name}
              showDialog={showDialog}
              setSelectedJump={setSelectedJump}
            />
          )}
          keyExtractor={(item) => item.jumpId}
        />
      </View>
      <MyDialog
        visible={dialogVisible}
        onDismiss={hideDialog}
        title="You have a session in progress"
        content="If you start a new session, your old session will be permanently
        deleted"
      >
        <>
          <Button onPress={continueSession}>RESUME WORKOUT IN PROGRESS</Button>
          <Button onPress={startNewSession}>START NEW WORKOUT</Button>
          <Button onPress={cancel}>CANCEL</Button>
        </>
      </MyDialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    justifyContent: "center",
    paddingVertical: 24,
  },
  listContainer: {
    flexGrow: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  actionsContainer: {
    alignItems: "flex-end",
    flexDirection: "column",
  },
});
