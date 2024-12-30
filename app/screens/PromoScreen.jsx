import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const categories = [
  { id: "1", name: "YUK LIBUR" },
  { id: "2", name: "Promo" },
  { id: "3", name: "GoFood" },
  { id: "4", name: "GoCar" },
  { id: "5", name: "GoPlay" },
];

const PromoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Promo</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Voucher Cards */}
        <View style={styles.voucherContainer}>
          <TouchableOpacity style={styles.voucherCard}>
            <Text style={styles.voucherNumber}>59</Text>
            <Text style={styles.voucherText}>voucher bisa dipakai</Text>
            <View style={[styles.voucherIndicator, { backgroundColor: "#FF5C1F" }]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.voucherCard}>
            <Text style={styles.voucherNumber}>0</Text>
            <Text style={styles.voucherText}>Langganan</Text>
            <View style={[styles.voucherIndicator, { backgroundColor: "#FF69B4" }]} />
          </TouchableOpacity>
        </View>

        {/* Promo Menu */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Icon name="ticket-percent" size={24} color="#00AA13" style={styles.menuIcon} />
              <Text style={styles.menuText}>Masukkan kode promo</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#687373" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Icon name="account-multiple" size={24} color="#00AA13" style={styles.menuIcon} />
              <Text style={styles.menuText}>Ajak teman, dapat voucher</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#687373" />
          </TouchableOpacity>
        </View>

        {/* Promo Section */}
        <View style={styles.promoSection}>
          <Text style={styles.promoTitle}>Promo menarik buat kamu</Text>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map(category => (
              <TouchableOpacity key={category.id} style={styles.categoryPill}>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Promo Card */}
          <TouchableOpacity style={styles.promoCard}>
            <Image source={require("../assets/promo1.jpg")} style={styles.promoBanner} resizeMode="cover" />
            <View style={styles.promoContent}>
              <Text style={styles.promoCardTitle}>Makin hemat s.d. 300rb!</Text>
              <Text style={styles.promoDescription}>Diskon sampai 8 tempat pake promo YUK LIBUR buat keperluan seru beli makan. Buruan klik & klaim promonya!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F6F6F6",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1C",
  },
  content: {
    flex: 1,
  },
  voucherContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  voucherCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  voucherNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginBottom: 4,
  },
  voucherText: {
    fontSize: 14,
    color: "#687373",
  },
  voucherIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  menuContainer: {
    padding: 16,
    gap: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 14,
    color: "#1C1C1C",
  },
  promoSection: {
    padding: 16,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginBottom: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#1C1C1C",
  },
  promoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  promoBanner: {
    width: "100%",
    height: 200,
  },
  promoContent: {
    padding: 16,
  },
  promoCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 14,
    color: "#687373",
    lineHeight: 20,
  },
});

export default PromoScreen;
