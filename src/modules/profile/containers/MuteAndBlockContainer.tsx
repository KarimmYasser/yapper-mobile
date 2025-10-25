import { useRouter } from "expo-router";
import React from "react";
import MuteAndBlockScreen from "../components/MuteAndBlockScreen";

export default function MuteAndBlockContainer() {
  // TODO: Get actual blocked count from store/API
  const blockedCount = 12;
  const mutedCount = 2;

  const router = useRouter();

  const handleBlockedAccountsPress = () => {
    // TODO: Navigate to blocked accounts list
    console.log("Navigate to blocked accounts");
  };

  const handleMutedAccountsPress = () => {
    // TODO: Navigate to muted accounts list
    console.log("Navigate to muted accounts");
    router.push("/(profile)/MuteAndBlock/Muted");
  };

  return (
    <MuteAndBlockScreen
      username="ahmed_kamal1" // TODO: Get from user context
      blockedCount={blockedCount}
      mutedCount={mutedCount}
      onBlockedAccountsPress={handleBlockedAccountsPress}
      onMutedAccountsPress={handleMutedAccountsPress}
    />
  );
}
