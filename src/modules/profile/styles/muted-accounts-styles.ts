import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/theme";

export const createMutedAccountsStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xl,
    },
    title: {
      fontSize: theme.typography.sizes.xxl,
      fontWeight: theme.typography.weights.extraBold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    description: {
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.text.secondary,
      lineHeight: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.medium
    },
    emptyState: {
      flex: 1,
    },
  });

export default createMutedAccountsStyles;
