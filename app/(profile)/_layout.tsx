import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "../../src/context/ThemeContext";

export default function ProfileLayout() {
  const { theme } = useTheme();
  
  const username = "Pixsellz";

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
    </Stack>
  );
}