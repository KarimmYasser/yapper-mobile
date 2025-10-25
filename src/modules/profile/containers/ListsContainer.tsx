import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import ListsComponent from "../components/ListsComponent";
import { createContainerStyles } from "../styles/container-style";

export default function ListsContainer() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const tabValue = Array.isArray(tab) ? tab[0] : tab;
  const { theme } = useTheme();
  const containerStyles = useMemo(() => createContainerStyles(theme), [theme]);

  return (
    <View style={containerStyles.container}>
      <ListsComponent initialTab={tabValue} />
    </View>
  );
}
