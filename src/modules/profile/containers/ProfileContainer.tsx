import { View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs";
import { createContainerStyles } from "../styles/container-style";

type ProfileContainerProps = {
  userId?: string;
  isOwnProfile?: boolean;
};

export default function ProfileContainer({ userId, isOwnProfile = true }: ProfileContainerProps) {
  const { theme } = useTheme();
  const containerStyles = createContainerStyles(theme);

  return (
    <View style={containerStyles.container}>
      <ProfileHeader userId={userId} isOwnProfile={isOwnProfile} />
      <ProfileTabs />
    </View>
  );
}