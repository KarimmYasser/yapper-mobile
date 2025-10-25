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

const PostsRoute = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.page}>
      <Text style={styles.placeholderText}>
        Tweets will be shown here.
      </Text>
    </View>
  );
};

const RepliesRoute = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.page}>
      <Text style={styles.placeholderText}>
        Replies will be shown here.
      </Text>
    </View>
  );
};

const MediaRoute = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.page}>
      <Text style={styles.placeholderText}>
        Media will be shown here.
      </Text>
    </View>
  );
};

const LikesRoute = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.page}>
      <Text style={styles.placeholderText}>
        Likes will be shown here.
      </Text>
    </View>
  );
};

export default function ProfileTabs() {
  const tabs: TabConfig[] = [
    { key: "tweets", title: "Tweets", component: PostsRoute },
    { key: "tweetsReplies", title: "Tweets & Replies", component: RepliesRoute },
    { key: "media", title: "Media", component: MediaRoute },
    { key: "likes", title: "Likes", component: LikesRoute },
  ];

  return <CustomTabView tabs={tabs} scrollEnabled={true} />;
}
