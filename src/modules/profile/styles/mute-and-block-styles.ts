import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/theme";

export const createMuteAndBlockStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    descriptionContainer: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      borderBottomWidth: 0.1,
      borderBottomColor: theme.colors.border,
    },
    description: {
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.text.secondary,
      lineHeight: theme.typography.sizes.lg,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.lg,
      borderBottomWidth: 0.1,
      borderBottomColor: theme.colors.border,
    },
    menuItemContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    menuItemTitle: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      color: theme.colors.text.primary,
    },
    menuItemRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    menuItemCount: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      color: theme.colors.text.secondary,
    },
  });

export default createMuteAndBlockStyles;
