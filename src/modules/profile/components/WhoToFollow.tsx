import { ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { spacing, typography } from '../../../constants/theme';
import { useTheme } from '../../../context/ThemeContext';
import ProfileCard, { ProfileCardData } from './ProfileCard';

type WhoToFollowProps = {
  profiles?: ProfileCardData[];
  onShowMore?: () => void;
};

// Mock data - replace with actual data from your API
const defaultProfiles: ProfileCardData[] = [
  {
    id: '1',
    name: 'esraa Muhammad',
    username: 'EsraaMuham25972',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    banner: "https://picsum.photos/1200/400",
    bio: 'ٲݣد   💦 ܢذڪݛـۅ☁️ ❄follow🔹🔹🔹ناݑﺮﺷــــــبــــیں',
    followedBy: ['ٲݣد'],
  },
  {
    id: '2',
    name: 'رأفت',
    username: 'Rafoott',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    banner: "https://picsum.photos/1200/400",
    bio: 'ويحب البيسبوسة',
    followedBy: ['ٲݣد', 'John'],
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    username: 'sarahjohnson',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    banner: 'https://picsum.photos/1200/400',
    bio: 'Designer & Developer | Creating beautiful things',
    followedBy: ['Mike', 'Emma'],
  },
  {
    id: '4',
    name: 'Alex Chen',
    username: 'alexchen',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    banner: 'https://picsum.photos/1200/400',
    bio: 'Tech enthusiast | Coffee lover ☕',
    followedBy: ['Sarah'],
  },
];

export default function WhoToFollow({ profiles = defaultProfiles, onShowMore }: WhoToFollowProps) {
  const { theme } = useTheme();
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({});

  const handleFollow = (userId: string) => {
    setFollowingStatus(prev => ({
      ...prev,
      [userId]: !prev[userId],
    }));
    // TODO: Implement actual follow/unfollow API call
  };

  const handleShowMore = () => {
    if (onShowMore) {
      onShowMore();
    }
    // TODO: Navigate to full "Who to follow" page or load more profiles
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background.primary,
      paddingVertical: spacing.lg,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    headerText: {
      fontSize: typography.sizes.lg,
      fontFamily: typography.fonts.bold,
      color: theme.colors.text.primary,
      lineHeight: 24,
    },
    showMoreButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    showMoreText: {
      fontSize: typography.sizes.sm,
      fontFamily: typography.fonts.regular,
      color: theme.colors.text.link,
      lineHeight: 20,
      marginRight: 4,
    },
    scrollContainer: {
      paddingHorizontal: spacing.lg,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Who to follow</Text>

        {/* Show More Button */}
        <TouchableOpacity 
          style={styles.showMoreButton} 
          onPress={handleShowMore}
          activeOpacity={0.7}
        >
          <Text style={styles.showMoreText}>Show more</Text>
          <ChevronRight size={20} color={theme.colors.text.link} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onFollow={handleFollow}
            isFollowing={followingStatus[profile.id]}
          />
        ))}
      </ScrollView>
    </View>
  );
}
