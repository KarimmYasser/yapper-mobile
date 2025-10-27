import React from "react";
import BlockedAccountsScreen from "../components/BlockedAccountsScreen";

export default function BlockedAccountsContainer() {
  // TODO: Fetch Blocked accounts from API
  const blockedAccounts: any[] = [];

  return (
    <BlockedAccountsScreen blockedAccounts={blockedAccounts} />
  );
}
