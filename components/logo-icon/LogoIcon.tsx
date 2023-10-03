import { Image, StyleSheet } from "react-native";

export default function LogoIcon() {
  return <Image style={styles.icon} source={require("../../assets/logo/jumper-icon-color.png")} />;
}

const styles = StyleSheet.create({
  icon: {
    height: 100,
    width: 100,
  },
});
