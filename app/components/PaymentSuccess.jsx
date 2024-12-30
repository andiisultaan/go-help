import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const PaymentSuccess = ({ navigation }) => {
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    // Animate the checkmark when component mounts
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();

    // Navigate to tracking page after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace("TrackingBooking");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

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
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    position: "absolute",
    bottom: "40%",
    textAlign: "center",
    width: "100%",
    zIndex: 1,
  },
});

export default PaymentSuccess;
