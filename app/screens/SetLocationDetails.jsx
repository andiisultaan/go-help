import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RadioButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const DeliveryDetails = ({ navigation, route }) => {
  const [recipientType, setRecipientType] = useState("sendToMyself");
  const [note, setNote] = useState("");

  const initialRegion = {
    latitude: -0.9115,
    longitude: 100.4558,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set Location</Text>
        </View>

        {/* Map Preview */}
        <View style={styles.mapPreviewContainer}>
          <MapView style={styles.mapPreview} initialRegion={initialRegion} scrollEnabled={false} zoomEnabled={false}>
            <Marker coordinate={initialRegion} />
          </MapView>
          <View style={styles.addressOverlay}>
            <Text style={styles.addressText}>Jl. Belibis No.24</Text>
            <Text style={styles.addressSubtext}>Air Tawar Bar., Kec. Padang Utara, Kota Padang</Text>
            <TouchableOpacity style={styles.setLocationButton}>
              <Text style={styles.setLocationButtonText}>Set Location</Text>
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

        {/* Search Location */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput style={styles.searchInput} placeholder="Search for a location" placeholderTextColor="#666" />
          </View>
          <View style={styles.miniMapContainer}>
            <MapView style={styles.miniMap} initialRegion={initialRegion} scrollEnabled={false} zoomEnabled={false}>
              <Marker coordinate={initialRegion} />
            </MapView>
          </View>
        </View>

        {/* Add Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add details</Text>
          <TextInput style={styles.noteInput} placeholder="note" placeholderTextColor="#666" multiline value={note} onChangeText={setNote} />
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("SetDestination")}>
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
  searchSection: {
    padding: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  miniMapContainer: {
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
  },
  miniMap: {
    ...StyleSheet.absoluteFillObject,
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
