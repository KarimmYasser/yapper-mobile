import { useRouter } from "expo-router";
import { ChevronLeft, Ellipsis } from "lucide-react-native";
import { useMemo, useRef, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { createHeaderStyles } from "../styles/profile-header-styles";
import { ImageOrigin, openImageViewer } from "../utils/profile-header.utils";
import AvatarViewer from "./AvatarViewer";
import EditProfileModal from "./EditProfileModal";
import ProfileActionsMenu from "./ProfileActionsMenu";


type ProfileHeaderProps = {
  userId?: string;
  isOwnProfile?: boolean;
};

export default function ProfileHeader({ userId, isOwnProfile = true }: ProfileHeaderProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [imageUri, setImageUri] = useState("https://randomuser.me/api/portraits/men/1.jpg");
  const [bannerUri, setBannerUri] = useState("https://picsum.photos/1200/400");
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const { theme } = useTheme();
  const headerStyles = useMemo(() => createHeaderStyles(theme), [theme]);

  const router = useRouter();

  // Media Related States
  const [viewerOpen, setViewerOpen] = useState(false);
  const [origin, setOrigin] = useState<ImageOrigin>(null);
  const avatarRef = useRef<any>(null);
  const bannerRef = useRef<any>(null);

  const handleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Implement mute functionality
    console.log(isMuted ? "User unmuted" : "User muted");
  };

  const handleBlock = () => {
    setIsBlocked(!isBlocked);
    // TODO: Implement block functionality
    console.log(isBlocked ? "User unblocked" : "User blocked");
  };

  return (
    <View style={headerStyles.container}>
      {/* Banner */}
      <TouchableOpacity
        activeOpacity={0.95}
        ref={bannerRef}
        onPress={() =>
          openImageViewer(bannerRef, setOrigin, setViewerOpen)
        }
      >
        <Image source={{ uri: bannerUri }} style={headerStyles.banner} />

        {/* Back Button */}
        <TouchableOpacity
          style={headerStyles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft color="#fff" size={25} />
        </TouchableOpacity>

        {/* Profile Actions */}
        {!isOwnProfile && (
          <TouchableOpacity
            style={headerStyles.actionsButton}
            onPress={() => setActionsMenuOpen(true)}
          >
            <Ellipsis color="#fff" size={25} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {/* Image and button Container */}
      <View style={headerStyles.imageContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          ref={avatarRef}
          onPress={() =>
            openImageViewer(avatarRef, setOrigin, setViewerOpen)
          }
        >
          <Image source={{ uri: imageUri }} style={headerStyles.avatar} />
        </TouchableOpacity>

        {/* Edit or Follow button */}
        {isOwnProfile ? (
          <TouchableOpacity
            style={headerStyles.editButton}
            onPress={() => setEditModalOpen(true)}
          >
            <Text style={headerStyles.editText}>Edit profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              headerStyles.editButton,
              isFollowing && headerStyles.followingButton
            ]}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text style={[
              headerStyles.editText,
              isFollowing && headerStyles.followingText
            ]}>
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Info */}
      <View style={headerStyles.info}>
        <Text style={headerStyles.name}>Pixsellz</Text>
        <Text style={headerStyles.handle}>@pixsellz</Text>
        <Text style={headerStyles.bio}>
          Digital Goodies Team - Web & Mobile UI/UX development; Graphics;
          Illustrations
        </Text>
        <Text style={headerStyles.link}>pixsellz.io • Joined September 2018</Text>

        {/* Stats */}
        <View style={headerStyles.stats}>
          <TouchableOpacity
            onPress={() => router.push("/(profile)/Lists?tab=following")}
          >
            <Text style={headerStyles.stat}>
              <Text style={headerStyles.bold}>217</Text> Following
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(profile)/Lists?tab=followers")}
          >
            <Text style={headerStyles.statWithMargin}>
              <Text style={headerStyles.bold}>118</Text> Followers
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Profile Modal - Only for own profile */}
      {isOwnProfile && (
        <EditProfileModal
          visible={editModalOpen}
          imageUri={imageUri}
          bannerUri={bannerUri}
          onImageChange={(newUri) => setImageUri(newUri)}
          onBannerChange={(newUri) => setBannerUri(newUri)}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {/* Avatar Viewer */}
      <AvatarViewer
        visible={viewerOpen}
        imageUri={origin && origin.width > 300 ? bannerUri : imageUri}
        origin={origin}
        isBanner={origin ? origin.width > 300 : false}
        onClose={() => setViewerOpen(false)}
        onEditRequested={isOwnProfile ? () => setEditModalOpen(true) : undefined}
      />

      {/* Profile Actions Menu - Only for other profiles */}
      {!isOwnProfile && (
        <ProfileActionsMenu
          visible={actionsMenuOpen}
          onClose={() => setActionsMenuOpen(false)}
          onMute={handleMute}
          onBlock={handleBlock}
          initialMuted={isMuted}
          initialBlocked={isBlocked}
        />
      )}
    </View>
  );
}

