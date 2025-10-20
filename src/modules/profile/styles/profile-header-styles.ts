import { StyleSheet } from "react-native";
import { Theme } from "../../../constants/theme";

export const createHeaderStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    banner: {
      width: "100%",
      height: 160,
      backgroundColor: theme.colors.background.tertiary,
      position: "relative",
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: theme.colors.background.primary,
      marginTop: -20,
      zIndex: 5,
    },
    imageContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      alignItems: "flex-start",
      zIndex: 5,
    },
    editButton: {
      backgroundColor: theme.colors.background.primary,
      borderWidth: 1,
      borderColor: theme.colors.text.link,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginTop: 12,
    },
    followingButton: {
      backgroundColor: theme.colors.text.link,
      borderColor: theme.colors.text.link,
    },
    backButton: {
      backgroundColor: "rgba(0,0,0,0.65)",
      width: 38,
      height: 38,
      borderRadius: 19,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 45,
      left: 20,
    },
    editText: { color: theme.colors.text.link, fontWeight: "600" },
    followingText: { color: theme.colors.background.primary },
    info: { paddingHorizontal: 16, marginTop: 10 },
    name: { fontSize: 20, fontWeight: "700", color: theme.colors.text.primary },
    handle: { color: theme.colors.text.secondary, marginBottom: 8 },
    bio: { fontSize: 14, color: theme.colors.text.primary, marginBottom: 4 },
    link: { fontSize: 12, color: theme.colors.text.link, marginBottom: 8 },
    stats: { flexDirection: "row" },
    stat: { fontSize: 14, color: theme.colors.text.primary },
    statWithMargin: { fontSize: 14, color: theme.colors.text.primary, marginLeft: 10 },
    bold: { fontWeight: "700" },
  });

// Keep backward compatibility with default export
const headerStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  banner: {
    width: "100%",
    height: 160,
    backgroundColor: "#1F1F1F",
    position: "relative",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
    marginTop: -20,
    zIndex: 5,
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "flex-start",
    zIndex: 5,
  },
  editButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4C9EEB",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.65)",
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 45,
    left: 20,
  },
  editText: { color: "#4C9EEB", fontWeight: "600" },
  info: { paddingHorizontal: 16, marginTop: 10 },
  name: { fontSize: 20, fontWeight: "700", color: "#000" },
  handle: { color: "#555", marginBottom: 8 },
  bio: { fontSize: 14, color: "#333", marginBottom: 4 },
  link: { fontSize: 12, color: "#1d9bf0", marginBottom: 8 },
  stats: { flexDirection: "row" },
  stat: { fontSize: 14, color: "#333" },
  bold: { fontWeight: "700" },
});

export default headerStyles;