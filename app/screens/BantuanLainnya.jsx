import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import * as Location from "expo-location";

const BantuanLainnya = ({ navigation }) => {
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
  const [assistanceType, setAssistanceType] = useState("urgent");
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
      returnScreen: "BantuanLainnya",
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
        <Text style={styles.headerTitle}>Booking Details</Text>
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
          <Text style={styles.sectionLabel}>Recipient details</Text>
          <Text style={styles.detailsLabel}>What kind of help?</Text>
          <TextInput style={styles.detailsInput} placeholder="problem details" placeholderTextColor="#666" multiline value={problemDetails} onChangeText={setProblemDetails} />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.categoryTitle}>Category</Text>
          <Text style={styles.categoryDescription}>Pilihan kategori yang sesuai dengan situasi anda saat ini. biaya yang tertera merupakan biaya konsultasi yang kompetitif.</Text>
          <RadioButton.Group onValueChange={value => setAssistanceType(value)} value={assistanceType}>
            <View style={styles.categoryContainer}>
              <TouchableOpacity style={[styles.categoryCard, assistanceType === "urgent" && styles.selectedCard]} onPress={() => setAssistanceType("urgent")}>
                <RadioButton.Android value="urgent" color="#006E0A" />
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>Urgent</Text>
                  <Text style={styles.categoryPrice}>Rp50.000</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.categoryCard, assistanceType === "middle" && styles.selectedCard]} onPress={() => setAssistanceType("middle")}>
                <RadioButton.Android value="middle" color="#006E0A" />
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>Middle</Text>
                  <Text style={styles.categoryPrice}>Rp40.000</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.categoryCard, assistanceType === "lowUrgent" && styles.selectedCard]} onPress={() => setAssistanceType("lowUrgent")}>
                <RadioButton.Android value="lowUrgent" color="#006E0A" />
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>Low Urgent</Text>
                  <Text style={styles.categoryPrice}>Rp30.000</Text>
                </View>
              </TouchableOpacity>
            </View>
          </RadioButton.Group>
        </View>
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          navigation.navigate("BantuanLainnyaDetails", {
            location: location,
            assistanceType: assistanceType,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    marginBottom: 12,
  },
  setLocationButton: {
    backgroundColor: "#006E0A",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  detailsLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 40,
    textAlignVertical: "top",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  categoryContainer: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
  },
  selectedCard: {
    borderColor: "#006E0A",
    backgroundColor: "#F5FFF6",
  },
  categoryContent: {
    marginLeft: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
  },
  categoryPrice: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
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

export default BantuanLainnya;
