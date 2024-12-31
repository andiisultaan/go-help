import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import * as Location from "expo-location";

const BantuanKendaraan = ({ navigation }) => {
  const [location, setLocation] = useState({
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
  const [recipientType, setRecipientType] = useState("bensinHabis");
  const [problemDetails, setProblemDetails] = useState("");

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    try {
      const [addressResponse] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResponse) {
        return {
          main: addressResponse.street || "Unknown location",
          secondary: `${addressResponse.district || ""}, ${addressResponse.city || ""}, ${addressResponse.region || ""}`.trim().replace(/^,\s*/, ""),
        };
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return {
        main: "Unable to fetch address",
        secondary: "Please check your internet connection",
      };
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
      const address = await fetchAddress(latitude, longitude);

      setLocation({
        region: {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        address,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Unable to fetch your location");
    }
  };

  const handleSetLocation = () => {
    navigation.navigate("LocationPicker", {
      returnScreen: "BantuanKendaraan",
      initialLocation: location.region,
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

      <ScrollView style={styles.content}>
        {/* Map and Location Section */}
        <View style={styles.mapPreviewContainer}>
          <MapView style={styles.mapPreview} region={location.region} scrollEnabled={false} zoomEnabled={false}>
            <Marker coordinate={location.region} />
          </MapView>
          <View style={styles.addressOverlay}>
            <Text style={styles.addressText}>{location.address.main}</Text>
            <Text style={styles.addressSubtext}>{location.address.secondary}</Text>
            <TouchableOpacity style={styles.setLocationButton} onPress={handleSetLocation}>
              <Text style={styles.setLocationButtonText}>Set Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recipient Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipient details</Text>
          <Text style={styles.sectionSubtitle}>What kind of help?</Text>
          <RadioButton.Group onValueChange={value => setRecipientType(value)} value={recipientType}>
            <View style={styles.radioOption}>
              <RadioButton.Android value="bensinHabis" color="#006E0A" />
              <Text style={styles.radioLabel}>Bensin Habis</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton.Android value="motorMati" color="#006E0A" />
              <Text style={styles.radioLabel}>Motor Mati</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Add Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add details*</Text>
          <TextInput style={styles.detailsInput} placeholder="problem details" placeholderTextColor="#666" multiline value={problemDetails} onChangeText={setProblemDetails} />
        </View>
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          navigation.navigate("BantuanKendaraanDetails", {
            location: location,
            problemType: recipientType,
            problemDetails: problemDetails,
          });
        }}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
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
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  mapPreviewContainer: {
    height: 200,
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
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
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
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
    backgroundColor: "#006E0A",
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
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: "top",
  },
  nextButton: {
    backgroundColor: "#006E0A",
    margin: 16,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default BantuanKendaraan;
