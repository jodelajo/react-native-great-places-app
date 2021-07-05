import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";

import Colors from "../constants/Colors";
import * as Location from "expo-location";
import MapPreview from "./MapPreview";

export default function LocationPicker() {
   
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false)

  async function verifyPermissions() {
    const result = await Location.requestForegroundPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permission to use this app.",
        [{ text: "ok" }]
      );
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
        setIsFetching(true)
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log('location', location);
      setPickedLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
      })
    } catch (err) {
      Alert.alert(
        "could not fetch location!",
        "Pleace try again later op pick a location on the map.",
        [{ text: "ok" }]
      );
    }
    setIsFetching(false)
  }

  return (<View style={styles.locationContainer}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
      {isFetching ? <ActivityIndicator size='large' color={Colors.primary}/> : 
  <Text>No location chosen yet!</Text>}
      </MapPreview>
      <Button
        title="Get user location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
