import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Animated, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

const BantuanLainnyaDetails = ({ navigation, route }) => {
  const { assistanceType } = route.params;

  const categoryInfo = {
    urgent: { name: "Urgent", price: 50000, color: "#FF9800" },
    middle: { name: "Middle", price: 40000, color: "#FFC107" },
    lowUrgent: { name: "Low Urgent", price: 30000, color: "#FFEB3B" },
  };

  const selectedCategory = categoryInfo[assistanceType];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("gopay");
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const paymentSlideAnimation = useRef(new Animated.Value(0)).current;

  const paymentMethods = [
    {
      id: "gopay-coins",
      name: "GoPay Coins",
      balance: 20000,
      icon: "monetization-on",
    },
    {
      id: "gopay",
      name: "GoPay",
      balance: 600000,
      icon: "account-balance-wallet",
    },
    {
      id: "gopaylater",
      name: "GoPayLater",
      balance: 100000,
      icon: "credit-card",
    },
    {
      id: "jago",
      name: "Jago Pocket",
      icon: "account-balance",
    },
    {
      id: "linkaja",
      name: "LinkAja",
      icon: "payment",
    },
    {
      id: "cash",
      name: "Cash",
      subtitle: "Min Rp50,000",
      icon: "attach-money",
    },
  ];

  useEffect(() => {
    if (isModalVisible) {
      Animated.spring(slideAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.spring(slideAnimation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (isPaymentModalVisible) {
      Animated.spring(paymentSlideAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.spring(paymentSlideAnimation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    }
  }, [isPaymentModalVisible]);

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const paymentTranslateY = paymentSlideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const formatCurrency = amount => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };

  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(method => method.id === selectedPayment);
  };

  const handleConfirmBooking = () => {
    setIsModalVisible(false);
    navigation.navigate("PaymentSuccess", { totalPrice: selectedCategory.price + 4000 });
  };

  const handlePaymentSelect = paymentId => {
    setSelectedPayment(paymentId);
    setIsPaymentModalVisible(false);
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Set Location</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Booking Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking details</Text>
          <View style={styles.cardContent}>
            <MaterialIcons name="person" size={24} color="#006E0A" />
            <View style={styles.detailsContent}>
              <Text style={styles.detailsName}>Puti Zafania</Text>
              <Text style={styles.detailsAddress}>Jl Belibis No.24, Air Tawar Bar...</Text>
            </View>
          </View>
        </View>

        {/* Problem Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Problem</Text>
          <View style={styles.cardContent}>
            <Text style={styles.problemText}>Tolong bantuin saya reload karena...</Text>
          </View>
        </View>

        {/* Category Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Category</Text>
          <View style={[styles.categoryBadge, { backgroundColor: selectedCategory.color }]}>
            <MaterialIcons name="access-time" size={24} color="#006E0A" />
            <Text style={styles.categoryText}>{selectedCategory.name}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.bookButtonText}>Booking Instant Ride</Text>
      </TouchableOpacity>

      {/* Booking Confirmation Modal */}
      <Modal animationType="fade" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirm Booking</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.serviceRow}>
                <MaterialIcons name="motorcycle" size={24} color="#006E0A" />
                <Text style={styles.serviceText}>Instant - {selectedCategory.name}</Text>
                <Text style={styles.priceText}>Rp{formatCurrency(selectedCategory.price + 4000)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.priceBreakdown}>
                <Text style={styles.priceBreakdownText}>Price: Rp{formatCurrency(selectedCategory.price)}</Text>
                <Text style={styles.priceBreakdownText}>Additional fee: Rp4.000</Text>
                <Text style={styles.priceBreakdownTotal}>Total: Rp{formatCurrency(selectedCategory.price + 4000)}</Text>
              </View>

              <View style={styles.divider} />

              {/* Payment Method Selection Button */}
              <TouchableOpacity
                style={styles.paymentSelector}
                onPress={() => {
                  setIsModalVisible(false);
                  setIsPaymentModalVisible(true);
                }}
              >
                <View style={styles.paymentSelectorLeft}>
                  <MaterialIcons name={getSelectedPaymentMethod()?.icon || "payment"} size={24} color="#006E0A" />
                  <View style={styles.paymentSelectorInfo}>
                    <Text style={styles.paymentSelectorLabel}>Payment method</Text>
                    <Text style={styles.paymentSelectorValue}>{getSelectedPaymentMethod()?.name}</Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#666" />
              </TouchableOpacity>

              <View style={styles.divider} />

              <Text style={styles.confirmText}>Are you sure you want to proceed with this booking?</Text>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirmBooking}>
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Payment Methods Modal */}
      <Modal animationType="fade" transparent={true} visible={isPaymentModalVisible} onRequestClose={() => setIsPaymentModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.paymentModalContent, { transform: [{ translateY: paymentTranslateY }] }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select payment method</Text>
              <TouchableOpacity onPress={() => setIsPaymentModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.paymentMethodsContainer}>
                {paymentMethods.map(method => (
                  <TouchableOpacity key={method.id} style={[styles.paymentMethod, selectedPayment === method.id && styles.paymentMethodSelected]} onPress={() => handlePaymentSelect(method.id)}>
                    <View style={styles.paymentMethodLeft}>
                      <MaterialIcons name={method.icon} size={24} color="#006E0A" />
                      <View style={styles.paymentMethodInfo}>
                        <Text style={styles.paymentMethodName}>{method.name}</Text>
                        {method.balance && <Text style={styles.paymentMethodBalance}>Balance: Rp{formatCurrency(method.balance)}</Text>}
                        {method.subtitle && <Text style={styles.paymentMethodSubtitle}>{method.subtitle}</Text>}
                      </View>
                    </View>
                    <View style={[styles.radioButton, selectedPayment === method.id && styles.radioButtonSelected]}>{selectedPayment === method.id && <View style={styles.radioButtonInner} />}</View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
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
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailsName: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailsAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  problemText: {
    fontSize: 14,
    color: "#666",
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  summaryContent: {
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#006E0A",
  },
  bookButton: {
    backgroundColor: "#006E0A",
    margin: 16,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  modalBody: {
    padding: 16,
    maxHeight: "70%",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  serviceText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#006E0A",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 16,
  },
  priceBreakdown: {
    marginTop: 16,
  },
  priceBreakdownText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  priceBreakdownTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006E0A",
    marginTop: 8,
  },
  paymentSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  paymentSelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentSelectorInfo: {
    marginLeft: 12,
  },
  paymentSelectorLabel: {
    fontSize: 12,
    color: "#666",
  },
  paymentSelectorValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginTop: 2,
  },
  confirmText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#006E0A",
  },
  confirmButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  paymentMethodsContainer: {
    padding: 16,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentMethodSelected: {
    backgroundColor: "#E8F5E9",
  },
  paymentMethodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  paymentMethodInfo: {
    marginLeft: 12,
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  paymentMethodBalance: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  paymentMethodSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#006E0A",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#006E0A",
  },
  paymentModalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    paddingBottom: 20,
    maxHeight: "80%",
  },
});

export default BantuanLainnyaDetails;
