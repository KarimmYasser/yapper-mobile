import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useRef, useState } from "react";
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

export default function ProfileHeader() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [imageUri, setImageUri] = useState("https://randomuser.me/api/portraits/men/1.jpg");
  const [bannerUri, setBannerUri] = useState("https://picsum.photos/1200/400");
  const { theme } = useTheme();
  const headerStyles = createHeaderStyles(theme);

  const router = useRouter();

  // Media Related States
  const [viewerOpen, setViewerOpen] = useState(false);
  const [origin, setOrigin] = useState<ImageOrigin>(null);
  const avatarRef = useRef<any>(null);
  const bannerRef = useRef<any>(null);

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

        {/* Edit button */}
        <TouchableOpacity
          style={headerStyles.editButton}
          onPress={() => setEditModalOpen(true)}
        >
          <Text style={headerStyles.editText}>Edit profile</Text>
        </TouchableOpacity>
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

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={editModalOpen}
        imageUri={imageUri}
        bannerUri={bannerUri}
        onImageChange={(newUri) => setImageUri(newUri)}
        onBannerChange={(newUri) => setBannerUri(newUri)}
        onClose={() => setEditModalOpen(false)}
      />


      {/* Avatar Viewer */}
      <AvatarViewer
        visible={viewerOpen}
        imageUri={origin && origin.width > 300 ? bannerUri : imageUri}
        origin={origin}
        isBanner={origin ? origin.width > 300 : false}
        onClose={() => setViewerOpen(false)}
        onEditRequested={() => setEditModalOpen(true)}
      />
    </View>
  );
}

