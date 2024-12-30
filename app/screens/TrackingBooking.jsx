import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FeedbackModal from "../components/FeedbackModal";

const TrackBooking = ({ navigation, route }) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const totalPrice = route.params?.totalPrice || 0;
  const discount = 1000; // Assuming a fixed discount for this example
  const finalPrice = totalPrice - discount;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Booking</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image source={require("../assets/help.png")} style={styles.illustration} resizeMode="contain" />

          {/* Status Bubble */}
          <View style={styles.statusBubble}>
            <Text style={styles.statusText}>Bantuan sedang berlangsung</Text>
          </View>
        </View>

        {/* Payment Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment summary</Text>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Price</Text>
            <Text style={styles.paymentValue}>Rp{totalPrice.toLocaleString()}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Discount</Text>
            <Text style={[styles.paymentValue, styles.discountText]}>Rp{discount.toLocaleString()}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Total payment</Text>
            <Text style={styles.totalValue}>Rp{finalPrice.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.completeButton} onPress={() => setShowFeedbackModal(true)}>
        <Text style={styles.completeButtonText}>Bantuan Selesai</Text>
      </TouchableOpacity>

      <FeedbackModal
        visible={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={() => {
          setShowFeedbackModal(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
        }}
      />
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
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  illustrationContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  illustration: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  statusBubble: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  paymentLabel: {
    color: "#666",
    fontSize: 14,
  },
  paymentValue: {
    fontSize: 14,
    color: "#000",
  },
  discountText: {
    color: "#2E7D32",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  completeButton: {
    backgroundColor: "#2E7D32",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TrackBooking;
