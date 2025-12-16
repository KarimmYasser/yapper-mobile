import { Theme } from '@/src/constants/theme';
import { useTheme } from '@/src/context/ThemeContext';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { IExploreTrending, ITrendItem } from '../types';
import TrendingItem from './TrendingItem';

interface ITrendingListProps {
  trends: (IExploreTrending | ITrendItem)[];
  loading?: boolean;
  refreshing?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onTrendingPress?: (trending: IExploreTrending | ITrendItem) => void;
  emptyMessage?: string;
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background.primary,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background.primary,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.sizes.md,
      fontFamily: theme.typography.fonts.medium,
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background.primary,
    },
    emptyText: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.sizes.md,
      fontFamily: theme.typography.fonts.regular,
      textAlign: 'center',
    },
  });

const TrendingList: React.FC<ITrendingListProps> = ({
  trends,
  loading = false,
  refreshing = false,
  error = null,
  onRefresh,
  onTrendingPress,
  emptyMessage,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = ({ item, index }: { item: IExploreTrending | ITrendItem; index: number }) => (
    <TrendingItem trending={item} rank={'trendRank' in item ? item.trendRank : index + 1} onPress={onTrendingPress} />
  );

  const renderEmpty = () => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage || t('explore.noTrending', 'No trending topics')}</Text>
      </View>
    );
  };

  if (loading && trends.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.text.secondary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={trends}
        renderItem={renderItem}
        keyExtractor={(item, index) => ('text' in item ? item.text : `trend-${index}`)}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.text.link}
              colors={[theme.colors.text.link]}
              progressBackgroundColor={theme.colors.background.primary}
            />
          ) : undefined
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TrendingList;
