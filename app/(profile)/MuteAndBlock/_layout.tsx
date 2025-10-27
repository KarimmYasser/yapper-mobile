import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "../../../src/context/ThemeContext";
import MuteAndBlockHeader from "../../../src/modules/profile/components/MuteAndBlockHeader";

export default function MuteAndBlockLayout() {
  const { theme } = useTheme();
  
  const username = "ahmed_kamal1";

  const screenOptions = React.useMemo(() => ({
    contentStyle: {
      backgroundColor: theme.colors.background.primary,
    },
    headerStyle: {
      backgroundColor: theme.colors.background.primary,
    },
    headerTintColor: theme.colors.text.primary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
      fontWeight: "700" as const,
      fontSize: 18,
    },
    headerShadowVisible: false,
  }), [theme]);

  const muteAndBlockOptions = React.useMemo(() => ({
    headerShown: true,
    headerBackTitle: "",
    headerTitle: () => <MuteAndBlockHeader username={username} title="Mute and block" />,
    headerTitleAlign: "center" as const,
  }), [username]);

  const mutedAccountsOptions = React.useMemo(() => ({
    headerShown: true,
    headerBackTitle: "",
    headerTitle: () => <MuteAndBlockHeader username={username} title="Muted accounts" />,
    headerTitleAlign: "center" as const,
  }), [username]);

  const blockedAccountsOptions = React.useMemo(() => ({
    headerShown: true,
    headerBackTitle: "",
    headerTitle: () => <MuteAndBlockHeader username={username} title="Blocked accounts" />,
    headerTitleAlign: "center" as const,
  }), [username]);

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="MuteAndBlockScreen"
        options={muteAndBlockOptions}
      />
      <Stack.Screen
        name="Muted"
        options={mutedAccountsOptions}
      />
      <Stack.Screen
        name="Blocked" 
        options={blockedAccountsOptions}
      /> 
    </Stack>
  );
}
