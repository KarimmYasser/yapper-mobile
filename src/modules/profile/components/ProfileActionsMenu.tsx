import { Ban, Volume2, VolumeOff } from "lucide-react-native";
import React, { useState } from "react";
import DropdownMenu, { DropdownMenuItem } from "../../../components/DropdownMenu";
import { useTheme } from "../../../context/ThemeContext";

interface IProfileActionsMenuProps {
  visible: boolean;
  onClose: () => void;
  onMute: () => void;
  onBlock: () => void;
  initialMuted?: boolean;
  initialBlocked?: boolean;
}

const ProfileActionsMenu: React.FC<IProfileActionsMenuProps> = ({
  visible,
  onClose,
  onMute,
  onBlock,
  initialMuted = false,
  initialBlocked = false,
}) => {
  const { theme } = useTheme();
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isBlocked, setIsBlocked] = useState(initialBlocked);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    onMute();
  };

  const handleBlockToggle = () => {
    setIsBlocked(!isBlocked);
    onBlock();
  };

  const menuItems: DropdownMenuItem[] = [
    {
      label: isMuted ? "Unmute" : "Mute",
      onPress: handleMuteToggle,
      icon: isMuted ? (
        <Volume2 color={theme.colors.text.primary} size={20} strokeWidth={1.5} />
      ) : (
        <VolumeOff color={theme.colors.text.primary} size={20} strokeWidth={1.5} />
      ),
    },
    {
      label: isBlocked ? "Unblock" : "Block",
      onPress: handleBlockToggle,
      icon: <Ban color={theme.colors.text.primary} size={20} strokeWidth={1.5} />,
    },
  ];

  return (
    <DropdownMenu
      visible={visible}
      onClose={onClose}
      items={menuItems}
      position={{ top: 100, right: 16 }}
    />
  );
};

export default ProfileActionsMenu;