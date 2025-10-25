import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, opacity, sizes, spacing, typography } from "../../../constants/theme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ImageViewerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  avatarImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: 0,
  },
  bannerImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.33,
    borderRadius: 0,
  },
  topBar: {
    position: "absolute",
    top: spacing.xxxl + spacing.md - 2,
    left: spacing.lg,
    zIndex: 10,
  },
  closeButton: {
    width: sizes.button.height,
    height: sizes.button.height,
    borderRadius: sizes.button.borderRadius,
    backgroundColor: `rgba(15, 20, 25, ${opacity.translucent - 0.1})`,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: spacing.xxxl,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    zIndex: 10,
  },
  editButton: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: `rgba(15, 20, 25, ${opacity.translucent - 0.1})`,
    borderRadius: borderRadius.xl + spacing.xs,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
});

export default ImageViewerStyle;