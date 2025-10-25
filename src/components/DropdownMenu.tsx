import React, { ReactNode } from "react";
import {
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { createDropdownMenuStyles } from "../styles/dropdown-menu-styles";

export interface DropdownMenuItem {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  textColor?: string;
  disabled?: boolean;
}

interface IDropdownMenuProps {
  visible: boolean;
  onClose: () => void;
  items: DropdownMenuItem[];
  position?: { top?: number; bottom?: number; left?: number; right?: number };
  containerStyle?: ViewStyle;
}

export default function DropdownMenu({
  visible,
  onClose,
  items,
  position = { top: 100, right: 16 },
  containerStyle,
}: IDropdownMenuProps) {
  const { theme, isDark } = useTheme();
  const styles = createDropdownMenuStyles(theme, isDark);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={[styles.menuContainer, position, containerStyle]}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <View style={styles.separator} />}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onClose();
                  setTimeout(() => item.onPress(), 100);
                }}
                activeOpacity={0.6}
                disabled={item.disabled}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    item.textColor && { color: item.textColor },
                    item.disabled && { opacity: 0.5 },
                  ]}
                >
                  {item.label}
                </Text>
                {item.icon && item.icon}
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}
