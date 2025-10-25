import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/theme";

export const createContainerStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
  });

export default createContainerStyles;
