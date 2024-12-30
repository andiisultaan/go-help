import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

const PaymentSuccess = ({ navigation, route }) => {
  const scaleValue = new Animated.Value(0);
  const totalPrice = route.params?.totalPrice || 0;

  useEffect(() => {
    // Hide the status bar
    StatusBar.setHidden(true);

    // Animate the checkmark when component mounts
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();

    // Navigate to tracking page after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace("TrackingBooking", { totalPrice });
    }, 2500);

    return () => {
      clearTimeout(timer);
      // Show the status bar when component unmounts
      StatusBar.setHidden(false);
    };
  }, [navigation, totalPrice, scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/success-payment.png")}
        style={[
          styles.backgroundImage,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Set a background color to ensure full coverage
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
});

export default PaymentSuccess;
