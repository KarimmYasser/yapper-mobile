import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { createEditModalStyles } from "../styles/edit-modal-styles";
import IconButton from "../ui/IconButton";
import Input from "../ui/Input";

type Props = {
  visible: boolean;
  onclose: () => void;
};

const EditProfileModal: React.FC<Props> = ({ visible, onclose }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [birthday, setBirthday] = useState("");
  

  const { theme } = useTheme();
  const editModalStyles = createEditModalStyles(theme);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onclose}
    >
      {/* Header buttons */}
      <View style={editModalStyles.buttonContainer}>
        <TouchableOpacity onPress={onclose}>
          <Text style={editModalStyles.buttonsText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={editModalStyles.titleText}>Edit Profile</Text>

        <TouchableOpacity onPress={onclose}>
          <Text style={editModalStyles.buttonsText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Modal content */}
      <View style={editModalStyles.contentContainer}>
        {/* Banner */}
        <TouchableOpacity >
          <Image
            source={{ uri: "https://picsum.photos/1200/400" }}
            style={editModalStyles.banner}
          />
        </TouchableOpacity>

        <View style={editModalStyles.insideContainer}>
          {/* Profile Image Edit */}
          <View style={editModalStyles.avatarContainer}>
            <Image
              source={{
                uri:
                  // selectedImage ||
                  "https://randomuser.me/api/portraits/men/1.jpg",
              }}
              style={editModalStyles.avatar}
            />

            {/* Dark overlay + camera icon */}
            <IconButton style={editModalStyles.overlay} >
              <Ionicons name="camera-outline" size={20} color="#fff" />
            </IconButton>
          </View>

          {/* User Details */}
          <View style={editModalStyles.userDetailsContainer}>
            {/* Name Input */}
            <Input
              label="Name"
              value={name}
              setValue={setName}
              style={editModalStyles.inputContainer}
              inputStyle={editModalStyles.input}
              placeholder="Add your name"
            />

            {/* Bio Input */}
            <Input
              label="Bio"
              value={bio}
              setValue={setBio}
              style={editModalStyles.inputContainer}
              inputStyle={editModalStyles.inputMultiline}
              placeholder="Add a bio to your profile"
              multiline
              numberOfLines={4}
            />

            {/* Location Input */}
            <Input
              label="Location"
              value={location}
              setValue={setLocation}
              style={editModalStyles.inputContainer}
              inputStyle={editModalStyles.input}
              placeholder="Add your location"
            />

            {/* Website Input */}
            <Input
              label="Website"
              value={website}
              setValue={setWebsite}
              style={editModalStyles.inputContainer}
              inputStyle={editModalStyles.input}
              placeholder="Add your website"
            />

            {/* Birthday Input */}
            <Input
              label="Birthday"
              value={birthday}
              setValue={setBirthday}
              style={editModalStyles.inputContainer}
              inputStyle={editModalStyles.input}
              placeholder="Add your date of birth"
            />
          </View>
        </View>
      </View>

      <StatusBar style="light" />
    </Modal>
  );
};

export default EditProfileModal;


