import { useRouter } from "expo-router";
import React from "react";
import MuteAndBlockScreen from "../components/MuteAndBlockScreen";

export default function MuteAndBlockContainer() {
  // TODO: Get actual blocked count from store
  const blockedCount = 12;
  const mutedCount = 2;

  const router = useRouter();

  const handleBlockedAccountsPress = () => {
    router.push("/(profile)/MuteAndBlock/Blocked");
  };

  const handleMutedAccountsPress = () => {
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
