import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";

import PlacesListScreen from "../screens/PlacesListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";
import { screenOptionsList } from "../screens/PlacesListScreen";
import { screenOptionsNew } from "../screens/NewPlaceScreen";
import { screenOptionsDetails } from "../screens/PlaceDetailScreen";
import { screenOptionsMap } from "../screens/MapScreen";

const Stack = createStackNavigator();


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white"
},
headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
}



export default function PlacesNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="AllPlaces"
        component={PlacesListScreen}
        options={screenOptionsList}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={screenOptionsDetails}
      />
      <Stack.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={screenOptionsNew}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={screenOptionsMap}
      />
    </Stack.Navigator>
  );
}
