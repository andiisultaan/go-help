import React from "react";
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get("window").width;

const shortcuts = [
  { id: "1", icon: "motorbike", label: "GoRide", color: "#00AA13" },
  { id: "2", icon: "food", label: "GoFood", color: "#EE2737" },
  { id: "3", icon: "shopping", label: "GoMart", color: "#D71149" },
  { id: "4", icon: "package", label: "GoSend", color: "#00AA13" },
  { id: "5", icon: "credit-card", label: "GoPay", color: "#00AED6" },
  { id: "6", icon: "gift", label: "Rewards", color: "#FF7B00" },
  { id: "7", icon: "hand-front-right", label: "GoHelp", color: "#00AA13" },
  { id: "8", icon: "dots-horizontal", label: "More", color: "#687373" },
];

const promos = [
  {
    id: "1",
    title: "Makin Hemat 😉",
    description: "Aktifkan & Gunakan GoPay di Tokopedia",
    image: require("../assets/poster5.png"),
  },
  {
    id: "2",
    title: "Makin Seru 🎮",
    description: "Mainkan game dan dapatkan hadiah",
    image: require("../assets/poster3.png"),
  },
  {
    id: "3",
    title: "Spesial Promo 😁",
    description: "Dapatkan cashback hingga 50%",
    image: require("../assets/poster4.png"),
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchBar}>
              <Icon name="magnify" size={20} color="#687373" />
              <TextInput placeholder="What do you need today?" style={styles.searchInput} placeholderTextColor="#687373" />
            </View>
            <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate("ProfileScreen")}>
              <Icon name="account-circle" size={24} color="#00AA13" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Gopay Card */}
        <View style={styles.gopayCard}>
          <View style={[styles.gopayInfo]}>
            <Image
              source={require("../assets/gopay-logo.jpg")} // Replace with your gopay logo
              style={styles.gopayLogo}
            />
            <View style={styles.gopayTextContainer}>
              <Text style={styles.balanceText}>Rp1.000.000</Text>
              <Text style={styles.historyText}>Tap for History</Text>
            </View>
          </View>

          <View style={styles.gopayActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="plus" size={20} color="#FFFFFF" />
              <Text style={styles.actionText}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="arrow-up" size={20} color="#FFFFFF" />
              <Text style={styles.actionText}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="rocket-launch" size={20} color="#FFFFFF" />
              <Text style={styles.actionText}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shortcuts Grid */}
        <View style={styles.shortcutsContainer}>
          {shortcuts.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.shortcutItem}
              onPress={() => {
                if (item.label === "GoHelp") {
                  navigation.navigate("GoHelpScreen");
                }
              }}
            >
              <View style={[styles.iconCircle, { backgroundColor: item.color + "15" }]}>
                <Icon name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={styles.shortcutLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promo Cards */}
        {promos.map(promo => (
          <TouchableOpacity key={promo.id} style={styles.promoCard}>
            <View style={styles.promoContent}>
              <Image source={promo.image} style={styles.promoImage} />
              <View style={styles.promoText}>
                <Text style={styles.promoTitle}>{promo.title}</Text>
                <Text style={styles.promoDescription}>{promo.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#1C1C1C",
  },
  userButton: {
    marginTop: 8,
    padding: 8,
  },
  shortcutsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 32,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  shortcutItem: {
    width: windowWidth / 5,
    alignItems: "center",
    marginBottom: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  shortcutLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#1C1C1C",
  },
  gopayCard: {
    margin: 16,
    backgroundColor: "#37809E",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gopayInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
  },
  gopayLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  gopayTextContainer: {
    justifyContent: "center",
  },
  balanceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  historyText: {
    fontSize: 12,
    color: "#00AA13",
    opacity: 0.8,
  },
  gopayActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginLeft: 20,
  },
  actionText: {
    marginTop: 4,
    fontSize: 11,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1C",
  },
  topupButton: {
    backgroundColor: "#00AA13",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  topupText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  gopayActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  gopayAction: {
    alignItems: "center",
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: "#FFFFFF",
  },
  promoCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "column", // Add this line
  },
  promoContent: {
    flexDirection: "column",
  },
  promoText: {
    flex: 1,
    padding: 10,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginBottom: 4,
  },
  promoDescription: {
    fontSize: 14,
    color: "#687373",
  },
  promoImage: {
    width: "100%",
    height: 170,
    borderRadius: 8,
  },
});
