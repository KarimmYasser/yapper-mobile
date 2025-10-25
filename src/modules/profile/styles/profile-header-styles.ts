import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/theme";

export const createHeaderStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xl,
    },
    banner: {
      width: "100%",
      height: theme.sizes.banner.height,
      backgroundColor: theme.colors.background.tertiary,
      position: "relative",
    },
    avatar: {
      width: theme.sizes.avatar.md,
      height: theme.sizes.avatar.md,
      borderRadius: theme.sizes.avatar.md / 2,
      borderWidth: 4,
      borderColor: theme.colors.background.primary,
      marginTop: -theme.spacing.xl,
      zIndex: 5,
    },
    imageContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.lg,
      alignItems: "flex-start",
      zIndex: 5,
    },
    editButton: {
      backgroundColor: theme.colors.background.primary,
      borderWidth: 1,
      borderColor: theme.colors.text.link,
      borderRadius: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      marginTop: theme.spacing.md,
    },
    followingButton: {
      backgroundColor: theme.colors.text.link,
      borderColor: theme.colors.text.link,
    },
    backButton: {
      backgroundColor: `rgba(0, 0, 0, ${theme.opacity.translucent - 0.2})`,
      width: theme.sizes.icon.lg + theme.spacing.xs * 3,
      height: theme.sizes.icon.lg + theme.spacing.xs * 3,
      borderRadius: (theme.sizes.icon.lg + theme.spacing.xs * 3) / 2,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: theme.spacing.xxxl + 5,
      left: theme.spacing.xl,
    },
    actionsButton: {
      backgroundColor: `rgba(0, 0, 0, ${theme.opacity.translucent - 0.2})`,
      width: theme.sizes.button.height,
      height: theme.sizes.button.height,
      borderRadius: theme.sizes.button.borderRadius,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: theme.spacing.xxxl + 5,
      right: theme.spacing.xl,
    },
    editText: {
      color: theme.colors.text.link,
      fontWeight: theme.typography.weights.semiBold,
    },
    followingText: {
      color: theme.colors.background.primary,
    },
    info: {
      paddingHorizontal: theme.spacing.lg,
      marginTop: theme.spacing.md - 2,
    },
    name: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
    },
    handle: {
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.sm,
    },
    bio: {
      fontSize: theme.typography.sizes.sm - 1,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    link: {
      fontSize: theme.typography.sizes.xs - 1,
      color: theme.colors.text.link,
      marginBottom: theme.spacing.sm,
    },
    stats: {
      flexDirection: "row",
    },
    stat: {
      fontSize: theme.typography.sizes.sm - 1,
      color: theme.colors.text.primary,
    },
    statWithMargin: {
      fontSize: theme.typography.sizes.sm - 1,
      color: theme.colors.text.primary,
      marginLeft: theme.spacing.md - 2,
    },
    bold: {
      fontWeight: theme.typography.weights.bold,
    },
  });

export default createHeaderStyles;