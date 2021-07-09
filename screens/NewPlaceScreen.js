import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as placesActions from "../store/places-actions";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

export default function NewPlaceScreen({ navigation, route }) {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState()


  const dispatch = useDispatch();

  function titleChangeHandler(text) {
    setTitleValue(text);
  }

  function imageTakenHandler(imagePath) {
    setSelectedImage(imagePath);
  }

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  },[])

  function savePlaceHandler() {
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
    navigation.goBack();
  }


  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={navigation}
          route={route}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="save"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
}

export const screenOptionsNew = (navData) => {
  return {
    headerTitle: "New Place",
  };
};

const styles = StyleSheet.create({
  from: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
