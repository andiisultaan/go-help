import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    {
      id: "pesanan",
      icon: "receipt-long",
      title: "Pesanan",
      subtitle: "Cek riwayat & reschedule aktif",
      route: "OrderHistory",
    },
    {
      id: "goclub",
      icon: "star",
      title: "GoClub",
      subtitle: "20 xp",
      route: "GoClub",
    },
    {
      id: "langganan",
      icon: "card-membership",
      title: "Langgananku",
      badge: "Baru!",
      route: "Subscriptions",
    },
    {
      id: "promo",
      icon: "local-offer",
      title: "Promo",
      route: "Promotions",
    },
    {
      id: "payment",
      icon: "payment",
      title: "Metode Pembayaran",
      route: "PaymentMethods",
    },
    {
      id: "help",
      icon: "help",
      title: "Bantuan & Laporan Saya",
      route: "Help",
    },
    {
      id: "business",
      icon: "business",
      title: "Profil Bisnis",
      route: "BusinessProfile",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profilku</Text>
      </View>

      {/* Profile Section */}
      <TouchableOpacity style={styles.profileSection} onPress={() => navigation.navigate("EditProfile")}>
        <View style={styles.profileInfo}>
          <Image source={require("../assets/profile.jpg")} style={styles.profileImage} />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Puti Zafania</Text>
            <Text style={styles.profilePhone}>+6281234567890</Text>
          </View>
        </View>
        <MaterialIcons name="edit" size={24} color="#666" />
      </TouchableOpacity>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={item.id} style={[styles.menuItem, index !== menuItems.length - 1 && styles.menuItemBorder]} onPress={() => navigation.navigate(item.route)}>
            <View style={styles.menuItemLeft}>
              <MaterialIcons name={item.icon} size={24} color="#2E7D32" />
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                {item.subtitle && <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>}
              </View>
            </View>
            <View style={styles.menuItemRight}>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileText: {
    justifyContent: "center",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: "#666",
  },
  menuContainer: {
    marginTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 14,
    color: "#000",
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default ProfileScreen;
