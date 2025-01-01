import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const popularCountries = [
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
];

const allCountries = [
  { code: "+93", name: "Afghanistan", flag: "🇦🇫" },
  { code: "+355", name: "Albania", flag: "🇦🇱" },
  { code: "+213", name: "Algeria", flag: "🇩🇿" },
  { code: "+1", name: "American Samoa", flag: "🇦🇸" },
  { code: "+376", name: "Andorra", flag: "🇦🇩" },
  // Add more countries as needed
];

const CountrySelector = ({ visible, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = [...popularCountries, ...allCountries].filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase()) || country.code.includes(searchQuery));

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      key={item.code}
      style={styles.countryItem}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.countryCode}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#9FA6A6" style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder="Ketik nama atau kode negara" value={searchQuery} onChangeText={setSearchQuery} />
          </View>

          <FlatList
            data={filteredCountries}
            renderItem={renderCountryItem}
            keyExtractor={item => item.code}
            ListHeaderComponent={() => (
              <View>
                <Text style={styles.sectionTitle}>Negara Populer</Text>
                {popularCountries.map(country => (
                  <TouchableOpacity
                    key={country.code}
                    style={styles.countryItem}
                    onPress={() => {
                      onSelect(country);
                      onClose();
                    }}
                  >
                    <Text style={styles.flag}>{country.flag}</Text>
                    <Text style={styles.countryName}>{country.name}</Text>
                    <Text style={styles.countryCode}>{country.code}</Text>
                  </TouchableOpacity>
                ))}
                <Text style={styles.sectionTitle}>Semua Negara</Text>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: "80%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#0B0B0B",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A4A4A",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F7F7F7",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: "#0B0B0B",
  },
  countryCode: {
    fontSize: 14,
    color: "#4A4A4A",
  },
});

export default CountrySelector;
