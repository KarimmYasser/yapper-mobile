import { Animated, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type Origin = { x: number; y: number; width: number; height: number };

export const calculateOpeningAnimation = (
  origin: Origin,
  isBanner: boolean
) => {
  const originCenterX = origin.x + origin.width / 2;
  const originCenterY = origin.y + origin.height / 2;
  const screenCenterX = SCREEN_WIDTH / 2;
  const screenCenterY = SCREEN_HEIGHT / 2;

  const initialTranslateX = originCenterX - screenCenterX;
  const initialTranslateY = originCenterY - screenCenterY;

  const targetSize = isBanner ? SCREEN_WIDTH : SCREEN_WIDTH;
  const initialScale = origin.width / targetSize;

  return {
    initialTranslateX,
    initialTranslateY,
    initialScale,
  };
};

export const animateOpen = (
  translateX: Animated.Value,
  translateY: Animated.Value,
  scale: Animated.Value,
  fadeAnim: Animated.Value,
  initialValues: {
    initialTranslateX: number;
    initialTranslateY: number;
    initialScale: number;
  }
) => {
  translateX.setValue(initialValues.initialTranslateX);
  translateY.setValue(initialValues.initialTranslateY);
  scale.setValue(initialValues.initialScale);
  fadeAnim.setValue(0);

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
};

export const resetAnimationValues = (
  translateX: Animated.Value,
  translateY: Animated.Value,
  scale: Animated.Value,
  fadeAnim: Animated.Value
) => {
  translateX.setValue(0);
  translateY.setValue(0);
  scale.setValue(1);
  fadeAnim.setValue(0);
};


export const animateClose = (
  fadeAnim: Animated.Value,
  translateY: Animated.Value,
  onComplete: () => void
) => {
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
  ]).start(onComplete);
};


export const handleSwipeProgress = (
  translateY: Animated.Value,
  fadeAnim: Animated.Value,
  dy: number
) => {
  if (dy > 0) {
    translateY.setValue(dy);
    const progress = Math.min(dy / 200, 1);
    fadeAnim.setValue(1 - progress * 0.5);
  }
};

export const handleSwipeRelease = (
  translateY: Animated.Value,
  fadeAnim: Animated.Value,
  dy: number,
  vy: number,
  onClose: () => void
) => {
  if (dy > 100 || vy > 0.5) {
    animateClose(fadeAnim, translateY, onClose);
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
};

export const SCREEN_DIMENSIONS = {
  WIDTH: SCREEN_WIDTH,
  HEIGHT: SCREEN_HEIGHT,
};
