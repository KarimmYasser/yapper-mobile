import { ChevronRight } from "lucide-react-native";
import React, { useMemo } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { createMuteAndBlockStyles } from "../styles/mute-and-block-styles";

interface IMuteAndBlockScreenProps {
  username: string;
  blockedCount?: number;
  mutedCount?: number;
  onBlockedAccountsPress: () => void;
  onMutedAccountsPress: () => void;
}

export default function MuteAndBlockScreen({
  username,
  blockedCount = 0,
  mutedCount = 0,
  onBlockedAccountsPress,
  onMutedAccountsPress,
}: IMuteAndBlockScreenProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createMuteAndBlockStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Manage the accounts, words and notifications that you&apos;ve muted or blocked.
          </Text>
        </View>

        {/* Blocked accounts */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={onBlockedAccountsPress}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Blocked accounts</Text>
          </View>
          <View style={styles.menuItemRight}>
            {blockedCount > 0 && (
              <Text style={styles.menuItemCount}>{blockedCount}</Text>
            )}
            <ChevronRight
              color={theme.colors.text.secondary}
              size={theme.sizes.icon.sm}
              strokeWidth={2}
            />
          </View>
        </TouchableOpacity>

        {/* Muted accounts */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={onMutedAccountsPress}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemTitle}>Muted accounts</Text>
          </View>
          <View style={styles.menuItemRight}>
            {mutedCount > 0 && (
              <Text style={styles.menuItemCount}>{mutedCount}</Text>
            )}
            <ChevronRight
              color={theme.colors.text.secondary}
              size={theme.sizes.icon.sm}
              strokeWidth={2}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
