import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

import Colors from "../constants/Colors";

export default function NewPlaceScreen() {
  const [titleValue, setTitleValue] = useState("");

  function titleChangeHandler(text) {
    setTitleValue(text);
  }

  function savePlaceHandler() {
    setTitleValue(titleValue)
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
        <Button title="save" color={Colors.primary} onPress={savePlaceHandler} />
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
