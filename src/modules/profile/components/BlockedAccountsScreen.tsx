import React, { useMemo } from "react";
import {
    ScrollView,
    Text,
    View,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { createMutedAccountsStyles } from "../styles/muted-and-blocked-accounts-styles";

interface IBlockedAccountsScreenProps {
  blockedAccounts?: any[];
}

const BlockedAccountsScreen: React.FC<IBlockedAccountsScreenProps> = ({
  blockedAccounts = [],
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createMutedAccountsStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Block unwanted accounts</Text>
          <Text style={styles.description}>
            They will be able to see your public posts, but will no longer be able to engage with them. They will also not be able to follow
            or message you, and you will not see notifications from them.
          </Text>
        </View>

        {blockedAccounts.length === 0 && (
          <View style={styles.emptyState}>
            {/* Empty state can be added later */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BlockedAccountsScreen;
