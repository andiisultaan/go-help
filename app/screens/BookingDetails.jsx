import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Modal, Animated, ScrollView } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

const BookingDetails = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("gopay");
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const paymentSlideAnimation = useRef(new Animated.Value(0)).current;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const getDistance = (start, end) => {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(end.latitude - start.latitude);
    const dLon = toRad(end.longitude - start.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(start.latitude)) * Math.cos(toRad(end.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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

  useEffect(() => {
    if (route.params?.pickupLocation && route.params?.destination) {
      setCurrentLocation(route.params.pickupLocation);
      setDestinationLocation(route.params.destination);
      setRegion({
        ...route.params.pickupLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [route.params]);

  const pickupLocation = {
    latitude: -0.9115,
    longitude: 100.4558,
  };

  const handleConfirmBooking = () => {
    setIsModalVisible(false);
    const totalPrice = calculateTotalPrice();
    navigation.navigate("PaymentSuccess", { totalPrice });
  };

  const handlePaymentSelect = paymentId => {
    setSelectedPayment(paymentId);
    setIsPaymentModalVisible(false);
    setIsModalVisible(true); // Ensure the main modal stays visible
  };

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

  const calculateTotalPrice = () => {
    const basePrice = 10000;
    const pricePerKm = 2000;
    const distance = currentLocation && destinationLocation ? getDistance(currentLocation, destinationLocation) : 0;
    return basePrice + pricePerKm * Math.ceil(distance);
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

      {/* Main Card */}
      <View style={styles.container2}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Booking details</Text>

          {/* Pickup Location Card */}
          <TouchableOpacity style={styles.locationItem}>
            <View style={styles.locationContent}>
              <View style={styles.locationIconContainer}>
                <View style={[styles.locationDot, styles.pickupDot]} />
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.primaryText}>Pickup Location</Text>
                <Text style={styles.secondaryText}>{route.params?.pickupAddress?.main || "Loading..."}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Connector Line */}
          <View style={styles.connectorLineContainer}>
            <View style={styles.connectorLine} />
          </View>

          {/* Destination Location Card */}
          <TouchableOpacity style={styles.locationItem}>
            <View style={styles.locationContent}>
              <View style={styles.locationIconContainer}>
                <View style={[styles.locationDot, styles.destinationDot]} />
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.primaryText}>Destination</Text>
                <Text style={styles.secondaryText}>{route.params?.destinationAddress?.main || "Set destination"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Details<Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput style={styles.detailsInput} placeholder="anterin saya sampai masuk rumah ya" placeholderTextColor="#666" multiline />
        </View>

        {/* Map Card */}
        <View style={styles.mapCard}>
          {region && (
            <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
              {currentLocation && (
                <Marker coordinate={currentLocation}>
                  <View style={styles.markerContainer}>
                    <MaterialIcons name="location-on" size={24} color="#2E7D32" />
                  </View>
                </Marker>
              )}
              {destinationLocation && (
                <Marker coordinate={destinationLocation}>
                  <View style={styles.markerContainer}>
                    <MaterialIcons name="location-on" size={24} color="#D32F2F" />
                  </View>
                </Marker>
              )}
              {currentLocation && destinationLocation && <Polyline coordinates={[currentLocation, destinationLocation]} strokeColor="#2E7D32" strokeWidth={3} lineDashPattern={[1]} />}
            </MapView>
          )}
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>Total Distance: {currentLocation && destinationLocation ? `${getDistance(currentLocation, destinationLocation).toFixed(2)}km` : "Calculating..."}</Text>
          </View>
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.nextButtonText}>Booking Instant Ride</Text>
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
                <MaterialIcons name="motorcycle" size={24} color="#2E7D32" />
                <Text style={styles.serviceText}>Instant - Bike</Text>
                <Text style={styles.priceText}>Rp{formatCurrency(calculateTotalPrice())}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.priceBreakdown}>
                <Text style={styles.priceBreakdownText}>Base Price: Rp10,000</Text>
                <Text style={styles.priceBreakdownText}>
                  Distance Fee: Rp{formatCurrency(calculateTotalPrice() - 10000)}({currentLocation && destinationLocation ? `${getDistance(currentLocation, destinationLocation).toFixed(2)}km` : "0km"})
                </Text>
                <Text style={styles.priceBreakdownTotal}>Total: Rp{formatCurrency(calculateTotalPrice())}</Text>
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
                  <MaterialIcons name={getSelectedPaymentMethod()?.icon || "payment"} size={24} color="#2E7D32" />
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
                      <MaterialIcons name={method.icon} size={24} color="#2E7D32" />
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
    backgroundColor: "#fff",
  },
  container2: {
    flex: 1,
    margin: 16,
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
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  requiredStar: {
    color: "red",
    marginLeft: 4,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  locationContent: {
    flexDirection: "row",
    flex: 1,
  },
  locationIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pickupDot: {
    backgroundColor: "#2E7D32",
  },
  destinationDot: {
    backgroundColor: "#D32F2F",
  },
  locationTextContainer: {
    flex: 1,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  secondaryText: {
    fontSize: 14,
    color: "#666",
  },
  connectorLineContainer: {
    paddingLeft: 24,
    height: 20,
  },
  connectorLine: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
  },
  detailsInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 14,
    color: "#000",
  },
  mapCard: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  distanceBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  distanceText: {
    fontSize: 12,
    color: "#666",
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
    color: "#2E7D32",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 16,
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
    borderRadius: 8,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#2E7D32",
  },
  confirmButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
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
    borderColor: "#2E7D32",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2E7D32",
  },
  paymentModalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    paddingBottom: 20,
    maxHeight: "80%",
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
    color: "#2E7D32",
    marginTop: 8,
  },
});

export default BookingDetails;
