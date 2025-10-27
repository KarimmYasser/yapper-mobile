import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Theme } from "../../../constants/theme";
import { useTheme } from "../../../context/ThemeContext";

interface IMuteAndBlockHeaderProps {
  username: string;
  title: string;
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

const MuteAndBlockHeader: React.FC<IMuteAndBlockHeaderProps> = ({ username, title }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>@{username}</Text>
    </View>
  );
};

export default MuteAndBlockHeader;