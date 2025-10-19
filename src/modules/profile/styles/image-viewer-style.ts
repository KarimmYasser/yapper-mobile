import { Dimensions, StyleSheet } from "react-native";

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
    top: 50,
    left: 16,
    zIndex: 10,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(15, 20, 25, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  editButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(15, 20, 25, 0.75)",
    borderRadius: 20,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default ImageViewerStyle;