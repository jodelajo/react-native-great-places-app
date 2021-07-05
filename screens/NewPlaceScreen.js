import React, { useState } from "react";
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

export default function NewPlaceScreen({ navigation }) {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  // console.log(selectedImage);
  
  const dispatch = useDispatch();

  function titleChangeHandler(text) {
    setTitleValue(text);
  }

  function imageTakenHandler( imagePath ) {
    setSelectedImage(imagePath);
    console.log(imagePath);
  }
  
  function savePlaceHandler() {
    dispatch(placesActions.addPlace(titleValue, selectedImage));
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
        <LocationPicker />
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
    // headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //         <Item title="All Places"
    //         iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
    //         onPress={() =>
    //         navData.navigation.navigate('NewPlace')}
    //         />
    //     </HeaderButtons>
    // )
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
