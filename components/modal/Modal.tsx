import { StyleSheet, View } from "react-native";
import { Modal, Portal, Button, useTheme, Text } from "react-native-paper";

interface CustomModalProps {
  visible: boolean;
  hideModal: () => void;
  title: string;
  content: React.ReactNode;
}

const CustomModal = ({
  visible,
  hideModal,
  content,
  title,
}: CustomModalProps) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: theme.colors.background,
          padding: 30,
          justifyContent: "space-between",
        }}
        style={{
          ...styles.container,
        }}
      >
        <>
          <View>
            <Text style={styles.title} variant="headlineLarge">
              {title}
            </Text>
          </View>
          <View>{content}</View>
          <View>
            <Button mode="contained" style={{ marginTop: 30 }} onPress={hideModal}>
              Close
            </Button>
          </View>
        </>
      </Modal>
    </Portal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    textAlign: "center",
  },
  content: {
    justifyContent: "space-between",
    padding: 20,
  },
});
