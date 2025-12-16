import HomeTabView from '@/src/components/home/HomeTabView';
import YapperLogo from '@/src/components/icons/YapperLogo';
import AppBar from '@/src/components/shell/AppBar';
import type { Theme } from '@/src/constants/theme';
import { MediaViewerProvider } from '@/src/context/MediaViewerContext';
import { useTheme } from '@/src/context/ThemeContext';
import useSpacing from '@/src/hooks/useSpacing';
import { useSwipableTabs } from '@/src/hooks/useSwipableTabs';
import CreatePostModal from '@/src/modules/tweets/components/CreatePostModal';
import Fab from '@/src/modules/tweets/components/Fab';
import MediaViewerModal from '@/src/modules/tweets/components/MediaViewerModal';
import TweetList from '@/src/modules/tweets/components/TweetList';
import { useTweetActions } from '@/src/modules/tweets/hooks/useTweetActions';
import { useTweets } from '@/src/modules/tweets/hooks/useTweets';
import { useTweetsFiltersStore } from '@/src/modules/tweets/store/useTweetsFiltersStore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { top, bottom } = useSpacing();
  const styles = createStyles(theme);

  const { t } = useTranslation();
  const { translateX, tabSwipePanResponder, homeIndex, setHomeIndex, screenWidth } = useSwipableTabs();
  const [isCreatePostModalVisible, setIsCreatePostModalVisible] = useState(false);

  const tweetsFilters = useTweetsFiltersStore((state) => state.filters);
  const forYouQuery = useTweets(tweetsFilters, 'for-you');
  const followingQuery = useTweets(tweetsFilters, 'following');

  const forYouTweets = React.useMemo(() => {
    return forYouQuery.data?.pages.flatMap((page) => page.data) ?? [];
  }, [forYouQuery.data]);

  const followingTweets = React.useMemo(() => {
    return followingQuery.data?.pages.flatMap((page) => page.data) ?? [];
  }, [followingQuery.data]);

  const onForYouRefresh = React.useCallback(() => {
    forYouQuery.refetch();
  }, [forYouQuery]);

  const onForYouEndReached = React.useCallback(() => {
    if (forYouQuery.hasNextPage && !forYouQuery.isFetchingNextPage) {
      forYouQuery.fetchNextPage();
    }
  }, [forYouQuery]);

  const onFollowingRefresh = React.useCallback(() => {
    followingQuery.refetch();
  }, [followingQuery]);

  const onFollowingEndReached = React.useCallback(() => {
    if (followingQuery.hasNextPage && !followingQuery.isFetchingNextPage) {
      followingQuery.fetchNextPage();
    }
  }, [followingQuery]);

  const { addPostMutation } = useTweetActions();

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t('home.emptyList')}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MediaViewerProvider>
        <View style={styles.appBarWrapper}>
          <AppBar
            children={<YapperLogo size={32} color={theme.colors.text.primary} />}
            tabView={<HomeTabView index={homeIndex} onIndexChange={(i) => setHomeIndex(i)} />}
          />
        </View>
        <MediaViewerModal />
        {/* Swipeable tab container */}
        <View style={styles.tabsOuterContainer} {...tabSwipePanResponder.panHandlers}>
          <Animated.View style={[styles.tabsInnerContainer, { width: screenWidth * 2, transform: [{ translateX }] }]}>
            <View style={[styles.tabPage, { width: screenWidth }]}>
              <TweetList
                data={forYouTweets}
                onRefresh={onForYouRefresh}
                refreshing={forYouQuery.isRefetching}
                onEndReached={onForYouEndReached}
                onEndReachedThreshold={0.5}
                isLoading={forYouQuery.isLoading}
                isFetchingNextPage={forYouQuery.isFetchingNextPage}
                useCustomRefreshIndicator={Platform.OS === 'ios'}
                topSpacing={top}
                bottomSpacing={bottom}
                listEmptyComponent={renderEmptyComponent}
              />
            </View>
            <View style={[styles.tabPage, { width: screenWidth }]}>
              <TweetList
                data={followingTweets}
                onRefresh={onFollowingRefresh}
                refreshing={followingQuery.isRefetching}
                onEndReached={onFollowingEndReached}
                onEndReachedThreshold={0.5}
                isLoading={followingQuery.isLoading}
                isFetchingNextPage={followingQuery.isFetchingNextPage}
                useCustomRefreshIndicator={Platform.OS === 'ios'}
                topSpacing={top}
                bottomSpacing={bottom}
                listEmptyComponent={renderEmptyComponent}
              />
            </View>
          </Animated.View>
        </View>
        <Fab onPress={() => setIsCreatePostModalVisible(true)} />
        <CreatePostModal
          visible={isCreatePostModalVisible}
          onClose={() => setIsCreatePostModalVisible(false)}
          onPost={(content, mediaUris) => addPostMutation.mutate({ content, mediaUris })}
          type="tweet"
        />
      </MediaViewerProvider>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    appBarWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    tabsOuterContainer: {
      flex: 1,
      overflow: 'hidden',
    },
    tabsInnerContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    tabPage: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
      paddingHorizontal: 20,
    },
    emptyText: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.sizes.md,
      textAlign: 'center',
    },
  });
