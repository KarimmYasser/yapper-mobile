import * as ImagePicker from "expo-image-picker";
import { ActionSheetIOS, Alert, Platform } from "react-native";

// Default images
export const DEFAULT_AVATAR_URI = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
export const DEFAULT_BANNER_URI = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='400'%3E%3Crect width='1200' height='400' fill='%23cccccc'/%3E%3C/svg%3E";

export const pickImageFromLibrary = async (
  isAvatar: boolean
): Promise<string | null> => {
  try {
    // Check permission status first
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    let finalStatus = status;

    // Only request if not already granted
    if (status !== "granted") {
      const { status: newStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      finalStatus = newStatus;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library in Settings to select images.",
        [{ text: "OK" }]
      );
      return null;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: isAvatar ? [1, 1] : [3, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch {
    Alert.alert("Error", "Failed to pick image from library");
    return null;
  }
};


export const takePicture = async (
  isAvatar: boolean
): Promise<string | null> => {
  try {
    // Check permission status first
    const { status } = await ImagePicker.getCameraPermissionsAsync();

    let finalStatus = status;

    // Only request if not already granted
    if (status !== "granted") {
      const { status: newStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      finalStatus = newStatus;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your camera in Settings to take pictures.",
        [{ text: "OK" }]
      );
      return null;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: isAvatar ? [1, 1] : [3, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch {
    Alert.alert("Error", "Failed to take picture");
    return null;
  }
};

export const showImagePickerOptions = (
  isAvatar: boolean,
  onImageSelected: (uri: string) => void,
  onImageDeleted: () => void
) => {
  const options = [
    "Choose from Library",
    "Take Picture",
    "Delete Image",
    "Cancel",
  ];
  const destructiveButtonIndex = 2;
  const cancelButtonIndex = 3;

  const handleLibraryPick = async () => {
    const uri = await pickImageFromLibrary(isAvatar);
    if (uri) {
      onImageSelected(uri);
    }
  };

  const handleTakePicture = async () => {
    const uri = await takePicture(isAvatar);
    if (uri) {
      onImageSelected(uri);
    }
  };

  if (Platform.OS === "ios") {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
      },
      (buttonIndex: number) => {
        if (buttonIndex === 0) {
          handleLibraryPick();
        } else if (buttonIndex === 1) {
          handleTakePicture();
        } else if (buttonIndex === 2) {
          onImageDeleted();
        }
      }
    );
  } else {
    // Android Alert
    Alert.alert("Change Image", "Choose an option", [
      {
        text: "Choose from Library",
        onPress: handleLibraryPick,
      },
      {
        text: "Take Picture",
        onPress: handleTakePicture,
      },
      {
        text: "Delete Image",
        onPress: onImageDeleted,
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }
};
