import ProfileContainer from "@/src/modules/profile/containers/ProfileContainer";
import { useLocalSearchParams } from "expo-router";

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return <ProfileContainer userId={id} isOwnProfile={false} />;
}
