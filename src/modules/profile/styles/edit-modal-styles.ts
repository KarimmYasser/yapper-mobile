import { Platform, StyleSheet } from "react-native";
import { Theme } from "../../../constants/theme";

export const createEditModalStyles = (theme: Theme) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
      backgroundColor: theme.colors.background.primary,
    },
    buttonsText: {
      fontSize: theme.typography.sizes.lg - 2,
      fontWeight: theme.typography.weights.medium,
      color: theme.colors.text.link,
    },
    titleText: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.black,
      color: theme.colors.text.primary,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    insideContainer: {
      paddingHorizontal: theme.spacing.xl,
    },
    avatarContainer: {
      alignSelf: "flex-start",
      position: "relative",
    },
    avatar: {
      width: theme.sizes.avatar.md,
      height: theme.sizes.avatar.md,
      borderRadius: theme.sizes.avatar.md / 2,
      borderWidth: 4,
      borderColor: theme.colors.background.primary,
      marginTop: -theme.spacing.xxl - theme.spacing.xs,
    },
    overlay: {
      position: "absolute",
      top: -theme.spacing.xl,
      left: theme.spacing.xs + 1,
      width: theme.sizes.avatar.md - theme.spacing.md - 2,
      height: theme.sizes.avatar.md - theme.spacing.md - 2,
      borderRadius: (theme.sizes.avatar.md - theme.spacing.md - 2) / 2,
      backgroundColor: `rgba(0, 0, 0, ${theme.opacity.overlay - 0.1})`,
      justifyContent: "center",
      alignItems: "center",
    },
    userDetailsContainer: {
      marginTop: theme.spacing.xl,
      flexDirection: "column",
    },
    inputContainer: {
      borderTopColor: theme.colors.border,
      borderTopWidth: 0.5,
      paddingVertical: theme.spacing.md,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md - 2,
    },
    label: {
      fontSize: theme.typography.sizes.lg - 4,
      fontWeight: theme.typography.weights.bold,
      width: theme.sizes.avatar.md,
      alignSelf: Platform.OS === "ios" ? "flex-start" : "center",
      color: theme.colors.text.primary,
    },
    input: {
      color: theme.colors.text.link,
      fontWeight: theme.typography.weights.semiBold,
      fontSize: theme.typography.sizes.sm,
    },
    inputMultiline: {
      color: theme.colors.text.link,
      fontWeight: theme.typography.weights.semiBold,
      fontSize: theme.typography.sizes.sm,
      height: theme.spacing.xxxl + theme.spacing.xl,
    },
    banner: {
      width: "100%",
      height: theme.sizes.banner.height,
      backgroundColor: theme.colors.background.tertiary,
      position: "relative",
    },
  });

export default createEditModalStyles;