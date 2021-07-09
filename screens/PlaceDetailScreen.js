import React, { useCallback, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import MapPreview from "../components/MapPreview";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import * as placesActions from "../store/places-actions";
import { useDispatch } from "react-redux";
import { deletePlaces } from "../helpers/db";

export default function PlaceDetailScreen({ navigation, route }) {
  const placeId = route.params ? route.params.placeId : null;
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const dispatch = useDispatch();

  const selectedLocation = { lat: selectedPlace ? selectedPlace.lat : null, lng: selectedPlace ? selectedPlace.lng : null };
  const showMapHandler = () => {
    navigation.navigate("Map", {
      readonly: true,
      initialLocation: selectedLocation,
    });
  };

  const deletePlaceHandler = useCallback(() => {
   
  deletePlaces(placeId)
    navigation.push('AllPlaces');
  }, [placeId]);
  

  useEffect(() => {
    navigation.setParams({ delLocation: deletePlaceHandler });
  }, [deletePlaceHandler]);


  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace ? selectedPlace.imageUri: null }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace ? selectedPlace.address: null}</Text>
        </View>

        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
}


export const screenOptionsDetails = (navData) => {
  const routeParams = navData.route.params;
  const deleteFn = routeParams
    ? routeParams.delLocation
    : null;

  return {
    // headerTitle: route.params.placeTitle,
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Delete Places"
            iconName={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            onPress={deleteFn}
            />
        </HeaderButtons>
    )
  };
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
