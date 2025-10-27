import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import type {
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import { TabBar, TabView } from "react-native-tab-view";
import { Theme } from "../constants/theme";
import { useTheme } from "../context/ThemeContext";

type RouteType = { key: string; title: string };

export interface TabConfig {
  key: string;
  title: string;
  component: React.ComponentType<any>;
}

interface ICustomTabViewProps {
  tabs: TabConfig[];
  initialTab?: string;
  scrollEnabled?: boolean;
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1 },
    tabBarContainer: {
      borderBottomWidth: 1,
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: theme.colors.background.primary,
      borderBottomColor: theme.colors.border,
    },
    tab: {},
    activeUnderline: {
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.text.link,
    },
  });

const CustomTabView: React.FC<ICustomTabViewProps> = ({
  tabs,
  initialTab,
  scrollEnabled = false,
}) => {
  const layout = useWindowDimensions();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Map tabs to routes
  const routes: RouteType[] = tabs.map((tab) => ({
    key: tab.key,
    title: tab.title,
  }));

  // Calculate initial index based on the parameter
  const getInitialIndex = () => {
    if (initialTab) {
      const tabIndex = routes.findIndex(
        (route) => route.key.toLowerCase() === initialTab.toLowerCase()
      );
      return tabIndex !== -1 ? tabIndex : 0;
    }
    return 0;
  };

  const [index, setIndex] = useState(getInitialIndex());

  // Dynamic scene renderer
  const renderScene = ({ route }: { route: RouteType }) => {
    const tab = tabs.find((t) => t.key === route.key);
    if (!tab) return null;
    const Component = tab.component;
    return <Component />;
  };

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<RouteType> }
  ) => (
    <TabBar
      {...props}
      scrollEnabled={scrollEnabled}
      indicatorStyle={styles.activeUnderline}
      style={styles.tabBarContainer}
      tabStyle={styles.tab}
      activeColor={theme.colors.text.link}
      inactiveColor={theme.colors.text.secondary}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      style={styles.container}
    />
  );
};

export default CustomTabView;