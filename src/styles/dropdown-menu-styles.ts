import { Platform, StyleSheet } from "react-native";
import { Theme } from "../constants/theme";

export const createDropdownMenuStyles = (theme: Theme, isDark: boolean) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: isDark
        ? `rgba(0, 0, 0, ${theme.opacity.overlay})`
        : `rgba(0, 0, 0, ${theme.opacity.overlay})`,
    },
    menuContainer: {
      position: "absolute",
      backgroundColor: isDark
        ? `rgba(40, 40, 42, ${theme.opacity.translucent})`
        : `rgba(255, 255, 255, ${theme.opacity.translucent})`,
      borderRadius: theme.borderRadius.xxl,
      shadowColor: theme.shadows.lg.shadowColor,
      shadowOffset: theme.shadows.lg.shadowOffset,
      shadowOpacity: isDark ? 0.5 : theme.shadows.lg.shadowOpacity,
      shadowRadius: theme.shadows.lg.shadowRadius,
      elevation: theme.shadows.lg.elevation,
      minWidth: 220,
      overflow: "hidden",
      borderWidth: Platform.OS === "ios" ? 0.5 : 0,
      borderColor: isDark
        ? `rgba(255, 255, 255, ${theme.opacity.border})`
        : `rgba(0, 0, 0, ${theme.opacity.border})`,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm + theme.spacing.xs / 2,
    },
    menuItemText: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.regular,
      color: theme.colors.text.primary,
      flex: 1,
      letterSpacing: theme.typography.letterSpacing.tight,
    },
    separator: {
      height: 0.5,
      backgroundColor: isDark
        ? `rgba(255, 255, 255, ${theme.opacity.separator})`
        : `rgba(0, 0, 0, ${theme.opacity.separator})`,
    },
  });
