import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SetDestination = ({ navigation }) => {
  const [destination, setDestination] = useState("");
  const [locationType, setLocationType] = useState("saved"); // 'saved' or 'manual'

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Set Location</Text>
      </View>

      {/* Current Location */}
      <View style={styles.currentLocation}>
        <View style={styles.locationIcon}>
          <Text style={styles.locationDot}>•</Text>
          <View style={styles.locationLine} />
          <Text style={styles.locationDot}>•</Text>
        </View>
        <View style={styles.locationText}>
          <Text style={styles.locationTitle}>Jl. Belibis No.24</Text>
          <Text style={styles.locationSubtitle}>Air Tawar Bar.</Text>
          <TextInput style={styles.destinationInput} placeholder="Where our destination?" value={destination} onChangeText={setDestination} />
        </View>
      </View>

      {/* Location Type Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={[styles.toggleButton, locationType === "saved" && styles.toggleButtonActive]} onPress={() => setLocationType("saved")}>
          <Text style={[styles.toggleText, locationType === "saved" && styles.toggleTextActive]}>saved pin map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.toggleButton, locationType === "manual" && styles.toggleButtonActive]} onPress={() => setLocationType("manual")}>
          <Text style={[styles.toggleText, locationType === "manual" && styles.toggleTextActive]}>manual location</Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("BookingDetails")}>
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
  currentLocation: {
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-start",
  },
  locationIcon: {
    alignItems: "center",
    marginRight: 12,
  },
  locationDot: {
    fontSize: 24,
    color: "#2E7D32",
  },
  locationLine: {
    width: 2,
    height: 30,
    backgroundColor: "#2E7D32",
    marginVertical: 4,
  },
  locationText: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  locationSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  destinationInput: {
    fontSize: 16,
    color: "#666",
    padding: 0,
  },
  toggleContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#e8f5e9",
  },
  toggleText: {
    fontSize: 14,
    color: "#666",
  },
  toggleTextActive: {
    color: "#2E7D32",
  },
  tabContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#2E7D32",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#2E7D32",
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: "#2E7D32",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SetDestination;
