import React from "react";
import MutedAccountsScreen from "../components/MutedAccountsScreen";

export default function MutedAccountsContainer() {
  // TODO: Fetch muted accounts from API
  const mutedAccounts: any[] = [];

  return (
    <MutedAccountsScreen mutedAccounts={mutedAccounts} />
  );
}
