import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, TextInput, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CountrySelector from "../components/CountrySelector";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+62",
    name: "Indonesia",
    flag: "🇮🇩",
  });

  const handleContinue = () => {
    if (phoneNumber.length < 10) {
      setError("Your with number?");
      return;
    }
    navigation.navigate("LoadingScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#0B0B0B" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/gojek-logo2.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Gojek</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instruction2}>Login</Text>
        <Text style={styles.instruction}>Enter your registered phone number to log in</Text>
        <Text style={styles.phoneNumberLabel}>
          Phone Number<Text style={styles.asterisk}>*</Text>
        </Text>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.countryCode} onPress={() => setShowCountrySelector(true)}>
            <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
            <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>
            <Icon name="keyboard-arrow-down" size={24} color="#0B0B0B" />
          </TouchableOpacity>
          <TextInput style={styles.phoneInput} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="87786642031" keyboardType="phone-pad" maxLength={12} />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.continueButton, phoneNumber.length > 0 ? styles.continueButtonActive : {}]} onPress={handleContinue} disabled={phoneNumber.length === 0}>
          <Text style={[styles.continueButtonText, phoneNumber.length > 0 ? styles.continueButtonTextActive : {}]}>Continue</Text>
        </TouchableOpacity>
      </View>

      <CountrySelector visible={showCountrySelector} onClose={() => setShowCountrySelector(false)} onSelect={country => setSelectedCountry(country)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 20,
    marginLeft: -40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0B0B0B",
    marginLeft: -20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  instruction: {
    fontSize: 14,
    color: "#4A4A4A",
    marginBottom: 24,
  },
  instruction2: {
    fontSize: 24,
    color: "#0B0B0B",
    marginBottom: 24,
    fontWeight: "bold",
  },
  phoneNumberLabel: {
    fontSize: 14,
    color: "#4A4A4A",
    marginBottom: 8,
  },
  asterisk: {
    color: "#FF4141",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#0B0B0B",
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: "#0B0B0B",
    padding: 0,
  },
  errorText: {
    color: "#FF4141",
    fontSize: 12,
    marginTop: 8,
  },
  buttonContainer: {
    padding: 16,
  },
  continueButton: {
    backgroundColor: "#E8E8E8",
    borderRadius: 24,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonActive: {
    backgroundColor: "#00880F",
  },
  continueButtonText: {
    color: "#9FA6A6",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButtonTextActive: {
    color: "#FFFFFF",
  },
});

export default LoginScreen;
