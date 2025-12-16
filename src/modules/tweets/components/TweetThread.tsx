import DropdownMenu, { DropdownMenuItem } from '@/src/components/DropdownMenu';
import GrokLogo from '@/src/components/icons/GrokLogo';
import ViewsIcon from '@/src/components/icons/ViewsIcon';
import { Theme } from '@/src/constants/theme';
import { useTheme } from '@/src/context/ThemeContext';
import { useNavigation } from '@/src/hooks/useNavigation';
import { useAuthStore } from '@/src/store/useAuthStore';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { MoreHorizontal, Trash2 } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DEFAULT_AVATAR_URI } from '../../profile/utils/edit-profile.utils';
import useTweetDropDownMenu from '../hooks/useTweetDropDownMenu';
import { ITweet } from '../types';
import { parseTweetBody } from '../utils/tweetParser';
import ActionsRow from './ActionsRow';
import CreatePostModal from './CreatePostModal';
import ParentTweet from './ParentTweet';
import RepostIndicator from './RepostIndicator';
import RepostOptionsModal from './RepostOptionsModal';
import TweetContent from './TweetContent';
import TweetMedia from './TweetMedia';
import UserInfoRow from './UserInfoRow';

interface ITweetProps {
  tweet: ITweet;
  onDeletePress: (tweetId: string) => void;
  onAvatarPress: (userId: string) => void;
  onReply: (tweetId: string, content: string) => void;
  onQuote: (tweetId: string, content: string) => void;
  onRepost: (tweetId: string, isReposted: boolean) => void;
  onLike: (tweetId: string, isLiked: boolean) => void;
  onBookmark: (tweetId: string, isBookmarked: boolean) => void;
  onViewPostInteractions: (tweetId: string, ownerId: string) => void;
  onShare: () => void;
  isVisible?: boolean;
  showThread: boolean;
  onMentionPress: (username: string) => void;
  onHashtagPress: (hashtag: string) => void;
}

const SingleTweet: React.FC<ITweetProps> = (props) => {
  const {
    tweet,
    onReply,
    onQuote,
    onLike,
    onRepost,
    onViewPostInteractions,
    onBookmark,
    onShare,
    onDeletePress,
    isVisible = true,
    onAvatarPress,
    showThread,
    onMentionPress,
    onHashtagPress,
  } = props;
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const user = useAuthStore((state) => state.user);
  const { menuVisible, menuPosition, moreButtonRef, handleMorePress, setMenuVisible } = useTweetDropDownMenu();

  const handleGrokPress = () => {
    navigate({
      pathname: '/(protected)/tweet-summary',
      params: { tweetId: tweet.tweetId },
    });
  };
  const handleReplyPress = () => {
    setCreatePostType('reply');
    setIsCreatePostModalVisible(true);
  };

  const handleQuotePress = () => {
    setCreatePostType('quote');
    setIsCreatePostModalVisible(true);
  };

  const handleTweetPress = () => {
    navigate({
      pathname: '/(protected)/tweets/[tweetId]',
      params: {
        tweetId: tweet.tweetId,
        tweetUserId: tweet.user.id,
      },
    });
  };

  const [isCreatePostModalVisible, setIsCreatePostModalVisible] = useState(false);

  const [createPostType, setCreatePostType] = useState<'tweet' | 'quote' | 'reply'>('tweet');
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handleRepostPress = () => {
    bottomSheetModalRef.current?.present();
  };
  const segments = useMemo(() => parseTweetBody(tweet.content, tweet.mentions), [tweet.content, tweet.mentions]);

  const menuItems: DropdownMenuItem[] = [
    {
      label: t('tweetActivity.viewPostInteractions'),
      onPress: () => {
        onViewPostInteractions(tweet.tweetId, tweet.user.id);
      },
      icon: <ViewsIcon size={theme.iconSizes.md} stroke={theme.colors.text.primary} strokeWidth={0} />,
    },
  ];

  if (tweet.user.id === user?.id) {
    menuItems.push({
      label: t('tweets.deletePost'),
      onPress: () => onDeletePress(tweet.tweetId),
      icon: <Trash2 size={theme.iconSizes.md} stroke={theme.colors.error} />,
      textColor: theme.colors.error,
    });
  }

  return (
    <Pressable accessibilityLabel="tweet_container_main" testID="tweet_container_main" onPress={handleTweetPress}>
      {tweet.repostedBy && tweet.postType !== 'reply' && (
        <RepostIndicator repostById={tweet.repostedBy?.id} repostedByName={tweet.repostedBy?.name} />
      )}
      <View style={styles.tweetContainer}>
        <View style={styles.imageColumn}>
          <Pressable
            onPress={() => onAvatarPress(tweet.user.id)}
            accessibilityLabel="tweet_avatar"
            testID="tweet_avatar"
          >
            <Image
              source={tweet.user.avatarUrl ? { uri: tweet.user.avatarUrl } : DEFAULT_AVATAR_URI}
              style={styles.avatar}
              accessibilityLabel="tweet_image_avatar"
              cachePolicy="memory-disk"
            />
          </Pressable>
        </View>
        <View style={styles.detailsColumn}>
          <View style={styles.topRow}>
            <UserInfoRow tweet={tweet} />
            <View style={styles.optionsRow}>
              <TouchableOpacity onPress={handleGrokPress} hitSlop={8}>
                <GrokLogo size={16} color={theme.colors.text.secondary} />
              </TouchableOpacity>
              <Pressable
                onPress={handleMorePress}
                hitSlop={8}
                ref={moreButtonRef}
                accessibilityLabel="tweet_button_more"
                testID="tweet_button_more"
              >
                <MoreHorizontal
                  size={16}
                  color={menuVisible ? theme.colors.accent.bookmark : theme.colors.text.secondary}
                />
              </Pressable>
            </View>
          </View>
          {(tweet.type === 'reply' || tweet.postType === 'reply') && tweet.parentTweet && !showThread && (
            <View style={styles.replyingToContainer}>
              <Text style={styles.replyingTo}>{t('tweets.replyingTo')}</Text>
              <Pressable onPress={() => onAvatarPress(tweet.parentTweet!.user.id)}>
                <Text style={styles.mention}>@{tweet.parentTweet.user.username}</Text>
              </Pressable>
            </View>
          )}
          <TweetContent segments={segments} onMentionPress={onMentionPress} onHashtagPress={onHashtagPress} />
          <TweetMedia images={tweet.images} videos={tweet.videos} tweetId={tweet.tweetId} />

          {(tweet.postType === 'quote' || tweet.type === 'quote') && tweet.parentTweet && (
            <View style={{ marginTop: theme.spacing.xs }}>
              <ParentTweet tweet={tweet.parentTweet} isVisible={isVisible} />
            </View>
          )}

          <ActionsRow
            tweet={tweet}
            size="small"
            onReplyPress={handleReplyPress}
            onRepostPress={handleRepostPress}
            onLikePress={() => onLike(tweet.tweetId, tweet.isLiked)}
            onBookmarkPress={() => onBookmark(tweet.tweetId, tweet.isBookmarked)}
            onSharePress={onShare}
          />

          <DropdownMenu
            visible={menuVisible}
            onClose={() => setMenuVisible(false)}
            items={menuItems}
            position={menuPosition}
          />

          <CreatePostModal
            visible={isCreatePostModalVisible}
            onClose={() => setIsCreatePostModalVisible(false)}
            type={createPostType}
            tweet={tweet}
            onPostReply={onReply}
            onPostQuote={onQuote}
          />

          <RepostOptionsModal
            isReposted={tweet.isReposted}
            onRepostPress={() => onRepost(tweet.tweetId, tweet.isReposted)}
            onQuotePress={handleQuotePress}
            onViewInteractionsPress={() => onViewPostInteractions(tweet.tweetId, tweet.user.id)}
            bottomSheetModalRef={bottomSheetModalRef}
          />
        </View>
      </View>
    </Pressable>
  );
};
const TweetThread: React.FC<ITweetProps> = (props) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (props.tweet.replies) {
    return (
      <View style={styles.conversationContainer}>
        <View style={[styles.relativeContainer, { paddingBottom: theme.spacing.lg }]}>
          <SingleTweet {...props} />
          <View style={styles.conversationSeparator} />
        </View>
        {props.tweet.replies.map((reply) => (
          <SingleTweet {...props} tweet={reply} key={reply.tweetId} />
        ))}
      </View>
    );
  }

  if (
    (props.tweet.postType === 'reply' || props.tweet.type === 'reply') &&
    props.tweet.parentTweet &&
    props.tweet.conversationTweet &&
    props.showThread
  ) {
    return (
      <View style={styles.conversationContainer}>
        <View style={[styles.relativeContainerWithGap, { paddingBottom: theme.spacing.lg, gap: theme.spacing.lg }]}>
          {props.tweet.conversationTweet.tweetId === props.tweet.parentTweet.tweetId ? (
            <SingleTweet {...props} tweet={props.tweet.conversationTweet} />
          ) : (
            <>
              <SingleTweet {...props} tweet={props.tweet.conversationTweet} />
              <SingleTweet {...props} tweet={props.tweet.parentTweet} />
            </>
          )}
          <View style={styles.conversationSeparator} />
        </View>
        <SingleTweet {...props} />
      </View>
    );
  }
  return (
    <View style={styles.conversationContainer}>
      <SingleTweet {...props} />
    </View>
  );
};

export default TweetThread;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    tweetContainer: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      // borderWidth: 1,
      // borderColor: 'red',
    },
    imageColumn: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    detailsColumn: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    optionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    tweetContent: {
      flexDirection: 'row',
    },
    avatar: {
      width: theme.avatarSizes.md,
      height: theme.avatarSizes.md,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.background.secondary,
    },
    tweetText: {
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fonts.regular,
    },
    conversationContainer: {
      padding: theme.spacing.md,
    },
    conversationSeparator: {
      position: 'absolute',
      backgroundColor: theme.colors.border,
      start: theme.avatarSizes.md / 2,
      top: theme.avatarSizes.md + theme.spacing.xs,
      bottom: theme.spacing.xs,
      zIndex: -1,
      width: 2,
    },
    replyingTo: {
      fontFamily: theme.typography.fonts.regular,
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.text.secondary,
      flexShrink: 2,
    },
    mention: {
      fontFamily: theme.typography.fonts.regular,
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.accent.bookmark,
    },
    replyingToContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    relativeContainer: {
      position: 'relative',
    },
    relativeContainerWithGap: {
      position: 'relative',
    },
  });
