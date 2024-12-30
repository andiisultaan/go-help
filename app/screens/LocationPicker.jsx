import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const LocationPicker = ({ navigation }) => {
  const initialRegion = {
    latitude: -0.9115,
    longitude: 100.4558,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          coordinate={{
            latitude: -0.9115,
            longitude: 100.4558,
          }}
        />
      </MapView>

      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Set your Location</Text>

        <View style={styles.addressContainer}>
          <View style={styles.pinIcon}>
            <Text style={styles.pinText}>📍</Text>
          </View>

          <View style={styles.addressTextContainer}>
            <Text style={styles.addressMain}>Jl. Belibis No.24</Text>
            <Text style={styles.addressSecondary}>Jl. Belibis No.24, Air Tawar Bar., Kec. Padang Utara, Kota Padang, Sumatera Barat, Indonesia</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SetLocationDetails")}>
          <Text style={styles.buttonText}>Next</Text>
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

export default LocationPicker;
