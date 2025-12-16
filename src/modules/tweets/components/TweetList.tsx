import { Theme } from '@/src/constants/theme';
import { useTheme } from '@/src/context/ThemeContext';
import { FlashList } from '@shopify/flash-list';
import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View, ViewToken } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TweetContainer from '../containers/TweetContainer';
import { ITweet } from '../types';

interface ITweetListProps {
  data: ITweet[];
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  topSpacing?: number;
  bottomSpacing?: number;
  isTabActive?: boolean;
  useCustomRefreshIndicator?: boolean;
  listHeaderComponent?: React.ReactNode;
  listEmptyComponent?: React.FC;
}
const TweetList: React.FC<ITweetListProps> = (props) => {
  const {
    data,
    onRefresh,
    refreshing,
    onEndReached,
    onEndReachedThreshold,
    isLoading,
    isFetchingNextPage,
    topSpacing = 0,
    bottomSpacing = 0,
    isTabActive = true,
    useCustomRefreshIndicator = false,
    listHeaderComponent: ListHeaderComponent,
    listEmptyComponent: ListEmptyComponent,
  } = props;
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [visibleTweetIds, setVisibleTweetIds] = useState<Set<string>>(new Set());

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const visibleIds = new Set(
      viewableItems.filter((item) => item.isViewable).map((item) => (item.item as ITweet).tweetId),
    );
    setVisibleTweetIds(visibleIds);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 90, // Item is considered visible when 90% is in view
    waitForInteraction: false,
  }).current;

  const renderHeader = () => {
    return (
      <View>
        {topSpacing > 0 && <View style={{ height: topSpacing }} />}
        {useCustomRefreshIndicator && refreshing && (
          <View style={styles.customRefreshContainer}>
            <ActivityIndicator color={theme.colors.text.primary} />
          </View>
        )}
        {ListHeaderComponent}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        {isFetchingNextPage && (
          <View style={styles.loadingFooter}>
            <ActivityIndicator size="small" color={theme.colors.text.primary} />
          </View>
        )}
        {bottomSpacing > 0 && <View style={{ height: bottomSpacing }} />}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.text.primary} />
      </View>
    );
  }

  return (
    <FlashList
      style={styles.list}
      data={data}
      renderItem={({ item }) => (
        <TweetContainer tweet={item} isVisible={isTabActive && visibleTweetIds.has(item.tweetId)} showThread={true} />
      )}
      keyExtractor={(item, index) => {
        if (item.type === 'repost') {
          return `${item.tweetId}-${item.repostedBy?.repostId}-${index}`;
        } else {
          return `${item.tweetId}-${index}`;
        }
      }}
      scrollIndicatorInsets={{ top: topSpacing - insets.top, bottom: bottomSpacing - insets.bottom }}
      refreshControl={
        <RefreshControl
          key={'refresh-' + topSpacing}
          refreshing={refreshing ?? false}
          onRefresh={onRefresh}
          tintColor={useCustomRefreshIndicator ? 'transparent' : theme.colors.text.primary}
          colors={useCustomRefreshIndicator ? ['transparent'] : [theme.colors.text.primary]}
          progressViewOffset={topSpacing}
        />
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      accessibilityLabel="tweet_list_feed"
      testID="tweet_list_feed"
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold ?? 0.5}
      removeClippedSubviews={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default TweetList;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: theme.colors.border,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingFooter: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    customRefreshContainer: {
      marginTop: -35,
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },

    list: {
      flex: 1,
    },
  });
