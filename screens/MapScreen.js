import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

export default function MapScreen({ navigation, route }) {
  const initialLocation = route.params ? route.params.initialLocation : null;
  const readonly = route.params ? route.params.readonly : null;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  }


  const savePickLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);


  useEffect(() => {
    navigation.setParams({ saveLocation: savePickLocationHandler });
  }, [savePickLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
}

export const screenOptionsMap = (navData) => {
  const routeParams = navData.route.params;
  const saveFn = routeParams
    ? routeParams.saveLocation
    : null;
    
    const readonly = routeParams ? routeParams.readonly : null;
    if (readonly) {
      return {}
    }

  return {
    // headerTitle: "Map",
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});
