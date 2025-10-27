import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type Props = {
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
};

const IconButton: React.FC<Props> = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
const styles = StyleSheet.create({
  wrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
});
