import React, { useMemo } from "react";
import {
    ScrollView,
    Text,
    View,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { createMutedAccountsStyles } from "../styles/muted-accounts-styles";

interface MutedAccountsScreenProps {
  mutedAccounts?: any[];
}

export default function MutedAccountsScreen({
  mutedAccounts = [],
}: MutedAccountsScreenProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createMutedAccountsStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Muted accounts</Text>
          <Text style={styles.description}>
            Posts from muted accounts won&apos;t show up in your Home timeline. Mute accounts directly from their profile or posts.
          </Text>
        </View>

        {/* Empty state or list of muted accounts would go here */}
        {mutedAccounts.length === 0 && (
          <View style={styles.emptyState}>
            {/* Empty state can be added later */}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
