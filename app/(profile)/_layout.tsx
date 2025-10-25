import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "../../src/context/ThemeContext";
import MuteAndBlockHeader from "../../src/modules/profile/components/MuteAndBlockHeader";

export default function ProfileLayout() {
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
  }), [theme]);

  const listsOptions = React.useMemo(() => ({
    headerShown: true,
    headerBackTitle: "",
    title: username,
    headerShadowVisible: false,
  }), [username]);

  const muteAndBlockOptions = React.useMemo(() => ({
    headerTitle: () => <MuteAndBlockHeader username={username} />,
    headerTitleAlign: "center" as const,
    headerShadowVisible: false,
  }), [username]);

  const mutedAccountsOptions = React.useMemo(() => ({
    headerShown: true,
    headerBackTitle: "",
    title: "Muted accounts",
    headerShadowVisible: false,
        headerTitleAlign: "center" as const,
  }), []);

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Lists"
        options={listsOptions}
      />
      <Stack.Screen
        name="MuteAndBlock/MuteAndBlock"
        options={muteAndBlockOptions}
      />
      <Stack.Screen
        name="MuteAndBlock/Muted"
        options={mutedAccountsOptions}
      />
    </Stack>
  );
}