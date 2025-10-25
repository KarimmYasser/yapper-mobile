import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Theme } from "../../../constants/theme";
import { useTheme } from "../../../context/ThemeContext";

interface IMuteAndBlockHeaderProps {
  username: string;
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
    },
    title: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold,
      color: theme.colors.text.primary,
    },
    subtitle: {
      fontSize: theme.typography.sizes.xs,
      color: theme.colors.text.secondary,
      marginTop: 2,
    },
  });

export default function MuteAndBlockHeader({ username }: IMuteAndBlockHeaderProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mute and block</Text>
      <Text style={styles.subtitle}>@{username}</Text>
    </View>
  );
}
