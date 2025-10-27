import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Props = {
  onPress?: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const ActionButton: React.FC<Props> = ({
  onPress,
  title,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontWeight: "700" },
});
