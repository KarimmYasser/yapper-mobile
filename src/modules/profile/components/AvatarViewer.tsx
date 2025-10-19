import { XIcon } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewerStyle from "../styles/image-viewer-style";

type Origin = { x: number; y: number; width: number; height: number } | null;

type Props = {
  visible: boolean;
  imageUri: string;
  origin: Origin;
  isBanner?: boolean;
  onClose: () => void;
  onEditRequested?: () => void;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function AvatarViewer({
  visible,
  imageUri,
  origin,
  isBanner,
  onClose,
  onEditRequested,
}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible && origin) {
      // Calculate initial position (from avatar/banner to center)
      const originCenterX = origin.x + origin.width / 2;
      const originCenterY = origin.y + origin.height / 2;
      const screenCenterX = SCREEN_WIDTH / 2;
      const screenCenterY = SCREEN_HEIGHT / 2;

      // Calculate how much to translate
      const initialTranslateX = originCenterX - screenCenterX;
      const initialTranslateY = originCenterY - screenCenterY;

      // Calculate initial scale (avatar size vs full screen size)
      const targetSize = isBanner ? SCREEN_WIDTH : SCREEN_WIDTH;
      const initialScale = origin.width / targetSize;

      // Set initial values
      translateX.setValue(initialTranslateX);
      translateY.setValue(initialTranslateY);
      scale.setValue(initialScale);
      fadeAnim.setValue(0);

      // Animate to center
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else if (!visible) {
      // Reset when closed
      translateX.setValue(0);
      translateY.setValue(0);
      scale.setValue(1);
      fadeAnim.setValue(0);
    }
  }, [visible, origin, fadeAnim, translateX, translateY, scale, isBanner]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleEdit = () => {
    handleClose();
    setTimeout(() => {
      if (onEditRequested) onEditRequested();
    }, 200);
  };

  // Simple swipe down to close gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to vertical swipes
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Only allow downward swipes
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
          // Fade out as user swipes down
          const progress = Math.min(gestureState.dy / 200, 1);
          fadeAnim.setValue(1 - progress * 0.5);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Close if swiped down enough
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          handleClose();
        } else {
          // Bounce back
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              speed: 20,
              bounciness: 0,
            }),
            Animated.spring(fadeAnim, {
              toValue: 1,
              useNativeDriver: true,
              speed: 20,
              bounciness: 0,
            }),
          ]).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Animated.View style={[ImageViewerStyle.container, { opacity: fadeAnim }]}>
        {/* Backdrop */}
        <View style={ImageViewerStyle.backdrop} />

        {/* Image Container with Gestures */}
        <View style={ImageViewerStyle.imageContainer} {...panResponder.panHandlers}>
          <Animated.View
            style={[
              ImageViewerStyle.imageWrapper,
              {
                transform: [
                  { translateX },
                  { translateY },
                  { scale },
                ],
              },
            ]}
          >
            <Image
              source={{ uri: imageUri }}
              style={[
                ImageViewerStyle.image,
                isBanner ? ImageViewerStyle.bannerImage : ImageViewerStyle.avatarImage,
              ]}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* Top Bar with Close Button */}
        <View style={ImageViewerStyle.topBar}>
          <TouchableOpacity
            onPress={handleClose}
            style={ImageViewerStyle.closeButton}
            activeOpacity={0.8}
          >
            <XIcon color="#fff" size={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Bottom Bar with Edit Button */}
        {onEditRequested && (
          <View style={ImageViewerStyle.bottomBar}>
            <TouchableOpacity
              onPress={handleEdit}
              style={ImageViewerStyle.editButton}
              activeOpacity={0.8}
            >
              <Text style={ImageViewerStyle.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </Modal>
  );
}
