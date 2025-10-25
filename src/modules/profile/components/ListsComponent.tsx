import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomTabView, { TabConfig } from "../../../components/CustomTabView";
import { Theme } from "../../../constants/theme";
import { useTheme } from "../../../context/ThemeContext";

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    page: { flex: 1, backgroundColor: theme.colors.background.primary },
    placeholderText: {
      textAlign: "center",
      marginTop: 40,
      fontSize: 16,
      color: theme.colors.text.secondary,
    },
  });

const FollowingRoute = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.page}>
      <Text style={styles.placeholderText}>
        Following List will be shown here.
      </Text>
    </View>
  );
};

const FollowersRoute = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.page}>
      <Text style={styles.placeholderText}>
        Followers List will be shown here.
      </Text>
    </View>
  );
};

interface ListsComponentProps {
  initialTab?: string;
}

export default function ListsComponent({ initialTab }: ListsComponentProps) {
  const tabs: TabConfig[] = [
    { key: "Following", title: "Following", component: FollowingRoute },
    { key: "Followers", title: "Followers", component: FollowersRoute },
  ];

  return <CustomTabView tabs={tabs} initialTab={initialTab} />;
}
