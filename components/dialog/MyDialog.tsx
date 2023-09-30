import React from "react";
import { Dialog, Portal, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

interface MyDialogProps {
  visible: boolean;
  onDismiss: () => void;
  content: string;
  children: React.ReactNode;
  title: string;
}

const MyDialog: React.FC<MyDialogProps> = ({
  visible,
  onDismiss,
  title,
  children,
  content,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.actionsContainer}>
          {children}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MyDialog;

const styles = StyleSheet.create({
  actionsContainer: {
    alignItems: "flex-end",
    flexDirection: "column",
  },
});
