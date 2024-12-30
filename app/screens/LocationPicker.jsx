import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { debounce } from "lodash";

const LocationScreen = ({ navigation, route }) => {
  const { locationType, initialLocation, returnScreen, currentPickupLocation } = route.params;
  const [region, setRegion] = useState(
    initialLocation || {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
  );

  const [address, setAddress] = useState({
    main: "",
    secondary: "",
  });

  const [isAddressLoading, setIsAddressLoading] = useState(false);

  useEffect(() => {
    if (locationType === "destination" && currentPickupLocation) {
      setRegion(currentPickupLocation);
      fetchAddress(currentPickupLocation.latitude, currentPickupLocation.longitude);
    } else if (initialLocation) {
      setRegion(initialLocation);
      fetchAddress(initialLocation.latitude, initialLocation.longitude);
    } else {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Please allow location access to use this feature.");
          return;
        }

        try {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          const { latitude, longitude } = location.coords;

          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          await fetchAddress(latitude, longitude);
        } catch (error) {
          Alert.alert("Error", "Unable to fetch your location");
          console.error(error);
        }
      })();
    }
  }, [initialLocation, currentPickupLocation, locationType]);

  const fetchAddress = async (latitude, longitude) => {
    setIsAddressLoading(true);
    try {
      const [addressResponse] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResponse) {
        setAddress({
          main: addressResponse.street || "Unknown location",
          secondary: `${addressResponse.district || ""}, ${addressResponse.city || ""}, ${addressResponse.region || ""}, ${addressResponse.country || ""}`.trim().replace(/^,\s*/, ""),
        });
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress({
        main: "Unable to fetch address",
        secondary: "Please try again later",
      });
    } finally {
      setIsAddressLoading(false);
    }
  };

  const debouncedFetchAddress = useCallback(debounce(fetchAddress, 1000, { leading: true, trailing: true }), []);

  const onRegionChangeComplete = newRegion => {
    setRegion(newRegion);
    debouncedFetchAddress(newRegion.latitude, newRegion.longitude);
  };

  const handleSelectLocation = () => {
    navigation.navigate(route.params.returnScreen, {
      selectedLocation: region,
      selectedAddress: address,
      locationType: locationType,
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onRegionChangeComplete={onRegionChangeComplete}>
        <Marker coordinate={region} />
      </MapView>

      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Set your {locationType === "pickup" ? "Pickup Location" : "Destination"}</Text>

        <View style={styles.addressContainer}>
          <View style={styles.pinIcon}>
            <Text style={styles.pinText}>📍</Text>
          </View>

          <View style={styles.addressTextContainer}>
            {isAddressLoading ? (
              <Text style={styles.addressMain}>Loading address...</Text>
            ) : (
              <>
                <Text style={styles.addressMain}>{address.main}</Text>
                <Text style={styles.addressSecondary}>{address.secondary}</Text>
              </>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSelectLocation} disabled={isAddressLoading}>
          <Text style={styles.buttonText}>{isAddressLoading ? "Loading..." : "Select"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  addressContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  pinIcon: {
    marginRight: 10,
    marginTop: 3,
  },
  pinText: {
    fontSize: 20,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressMain: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  addressSecondary: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LocationScreen;
