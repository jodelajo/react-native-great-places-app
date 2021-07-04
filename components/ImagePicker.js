import React, { useState } from "react";
import { Text, View, Button, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";

export default function ImgPicker( {onImageTaken}) {
    const [pickedImage, setPickedImage] = useState();
    // console.log(pickedImage);

  async function verifyPermissions() {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permission to use this app.",
        [{ text: "ok" }]
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    onImageTaken(image.uri)
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>no image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 15
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
