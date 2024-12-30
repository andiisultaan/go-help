import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const tabs = [
  { id: "history", label: "Riwayat" },
  { id: "process", label: "Dalam proses" },
  { id: "scheduled", label: "Terjadwal" },
];

const orders = [
  {
    id: "1",
    type: "gopay",
    title: "Transaksi Gopay",
    icon: "wallet",
    iconBg: "#00AED6",
    showArrow: true,
  },
  {
    id: "2",
    type: "gohelp",
    title: "Jasa Pendampingan Pulang",
    date: "29 Des 11.38",
    price: "Rp15.000",
    icon: "hand-front-right",
    iconBg: "#00AA13",
    status: "Pesan lagi",
  },
  {
    id: "3",
    type: "gohelp",
    title: "Bantuan untuk sehari",
    date: "29 Des 11.38",
    price: "Rp15.000",
    icon: "hand-front-right",
    iconBg: "#00AA13",
    status: "Pesan lagi",
  },
  {
    id: "4",
    type: "gohelp",
    title: "Belanja Barang",
    date: "28 Des 11.39",
    price: "Rp45.000",
    icon: "hand-front-right",
    iconBg: "#00AA13",
    status: "Pesan lagi",
  },
];

const OrderScreen = () => {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pesanan</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="bell-outline" size={24} color="#1C1C1C" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab.id} style={[styles.tab, activeTab === tab.id && styles.activeTab]} onPress={() => setActiveTab(tab.id)}>
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <View style={styles.filterLeft}>
          <Text style={styles.filterText}>GoFood</Text>
        </View>
        <TouchableOpacity style={styles.filterRight}>
          <Text style={styles.filterText}>Status</Text>
          <Icon name="chevron-down" size={20} color="#1C1C1C" />
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersList} showsVerticalScrollIndicator={false}>
        <View style={styles.ordersContainer}>
          {orders.map(order => (
            <TouchableOpacity key={order.id} style={styles.card}>
              <View style={styles.orderItem}>
                <View style={styles.orderLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: order.iconBg }]}>
                    <Icon name={order.icon} size={20} color="white" />
                  </View>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderTitle}>{order.title}</Text>
                    {order.date && <Text style={styles.orderDate}>{order.date}</Text>}
                  </View>
                </View>
                <View style={styles.orderRight}>
                  {order.price && <Text style={styles.orderPrice}>{order.price}</Text>}
                  {order.status ? (
                    <TouchableOpacity style={styles.statusButton}>
                      <Text style={styles.statusText}>{order.status}</Text>
                    </TouchableOpacity>
                  ) : (
                    <Icon name="chevron-right" size={24} color="#687373" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Changed to light gray for card contrast
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F6F6F6",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1C",
  },
  headerButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F6F6F6",
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#00AA13",
  },
  tabText: {
    fontSize: 14,
    color: "#687373",
  },
  activeTabText: {
    color: "#00AA13",
    fontWeight: "500",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F6F6F6",
  },
  filterLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    color: "#1C1C1C",
    marginRight: 4,
  },
  ordersList: {
    flex: 1,
  },
  ordersContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  orderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 14,
    color: "#1C1C1C",
    marginBottom: 4,
    fontWeight: "500",
  },
  orderDate: {
    fontSize: 12,
    color: "#687373",
  },
  orderRight: {
    alignItems: "flex-end",
  },
  orderPrice: {
    fontSize: 14,
    color: "#1C1C1C",
    marginBottom: 4,
    fontWeight: "500",
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#E8F5E9",
  },
  statusText: {
    fontSize: 12,
    color: "#00AA13",
    fontWeight: "500",
  },
});

export default OrderScreen;
