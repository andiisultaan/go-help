import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RadioButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const DeliveryDetails = ({ navigation, route }) => {
  const [recipientType, setRecipientType] = useState("sendToMyself");
  const [note, setNote] = useState("");
  const [pickupLocation, setPickupLocation] = useState({
    region: {
      latitude: -0.9115,
      longitude: 100.4558,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    address: {
      main: "Loading...",
      secondary: "Please wait while we fetch your location",
    },
  });
  const [destination, setDestination] = useState({
    region: {
      latitude: -0.9115,
      longitude: 100.4558,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    address: {
      main: "Please set your destination...",
      secondary: "",
    },
  });

  useEffect(() => {
    if (route.params?.selectedLocation && route.params?.selectedAddress) {
      if (route.params.locationType === "destination") {
        setDestination({
          region: route.params.selectedLocation,
          address: route.params.selectedAddress,
        });
      }
    }

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (route.params?.selectedLocation && route.params?.selectedAddress && route.params.locationType === "pickup") {
      setPickupLocation({
        region: route.params.selectedLocation,
        address: route.params.selectedAddress,
      });
    }
  }, [route.params]);

  const fetchAddress = async (latitude, longitude, locationType) => {
    try {
      const [addressResponse] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResponse) {
        const newAddress = {
          main: addressResponse.street || "Unknown location",
          secondary: `${addressResponse.district || ""}, ${addressResponse.city || ""}, ${addressResponse.region || ""}`.trim().replace(/^,\s*/, ""),
        };
        if (locationType === "pickup") {
          setPickupLocation(prev => ({ ...prev, address: newAddress }));
        } else {
          setDestination(prev => ({ ...prev, address: newAddress }));
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      if (locationType === "pickup") {
        setPickupLocation(prev => ({ ...prev, address: { main: "Unable to fetch address", secondary: "Please check your internet connection" } }));
      } else {
        setDestination(prev => ({ ...prev, address: { main: "Unable to fetch address", secondary: "Please check your internet connection" } }));
      }
    }
  };

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Please allow location access to use this feature.");
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setPickupLocation({
        region: {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        address: { main: "Loading...", secondary: "Please wait while we fetch your location" },
      });
      await fetchAddress(latitude, longitude, "pickup");
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Unable to fetch your location");
    }
  };

  const handleSetLocation = locationType => {
    navigation.navigate("LocationPicker", {
      returnScreen: "SetLocationDetails",
      locationType: locationType,
      initialLocation: locationType === "pickup" ? pickupLocation.region : destination.region,
      currentPickupLocation: pickupLocation.region,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Set Location</Text>
      </View>

      <ScrollView>
        {/* Pickup Location */}
        <View style={styles.mapPreviewContainer}>
          <MapView style={styles.mapPreview} region={pickupLocation.region} scrollEnabled={false} zoomEnabled={false}>
            <Marker coordinate={pickupLocation.region} />
          </MapView>
          <View style={styles.addressOverlay}>
            <Text style={styles.addressText}>{pickupLocation.address.main}</Text>
            <Text style={styles.addressSubtext}>{pickupLocation.address.secondary}</Text>
            <TouchableOpacity style={styles.setLocationButton} onPress={() => handleSetLocation("pickup")}>
              <Text style={styles.setLocationButtonText}>Set Pickup Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Destination */}
        <View style={styles.mapPreviewContainer}>
          <MapView style={styles.mapPreview} region={destination.region} scrollEnabled={false} zoomEnabled={false}>
            <Marker coordinate={destination.region} />
          </MapView>
          <View style={styles.addressOverlay}>
            <Text style={styles.addressText}>{destination.address.main}</Text>
            <Text style={styles.addressSubtext}>{destination.address.secondary}</Text>
            <TouchableOpacity style={styles.setLocationButton} onPress={() => handleSetLocation("destination")}>
              <Text style={styles.setLocationButtonText}>Set Destination</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recipient Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipient details</Text>
          <RadioButton.Group onValueChange={value => setRecipientType(value)} value={recipientType}>
            <View style={styles.radioOption}>
              <RadioButton.Android value="jasaPendampinganPulang" color="#2E7D32" />
              <Text style={styles.radioLabel}>Jasa Pendampingan Pulang</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton.Android value="pendampingan" color="#2E7D32" />
              <Text style={styles.radioLabel}>Pendampingan</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Add Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add details</Text>
          <TextInput style={styles.noteInput} placeholder="note" placeholderTextColor="#666" multiline value={note} onChangeText={setNote} />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate("BookingDetails", {
              pickupLocation: pickupLocation.region,
              destination: destination.region,
              pickupAddress: pickupLocation.address,
              destinationAddress: destination.address,
            })
          }
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  mapPreviewContainer: {
    height: 200,
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  mapPreview: {
    ...StyleSheet.absoluteFillObject,
  },
  addressOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "500",
  },
  addressSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  setLocationButton: {
    backgroundColor: "#2E7D32",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  setLocationButtonText: {
    color: "white",
    fontWeight: "500",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  nextButton: {
    backgroundColor: "#2E7D32",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DeliveryDetails;
