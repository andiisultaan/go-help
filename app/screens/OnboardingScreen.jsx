import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";

const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require("../assets/gojek-logo2.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Gojek</Text>
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image source={require("../assets/login1.png")} style={styles.illustration} resizeMode="contain" />
        </View>
        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Selamat datang di gojek!</Text>
          <Text style={styles.subText}>Aplikasi yang bikin hidup lebih mudah. Mau kemana hari ini?</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginButtonText}>Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerButtonText}>
            Belum ada akun? <Text style={styles.registerButtonTextBold}>Daftar dulu</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.disclaimerText}>Dengan masuk atau mendaftar, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
  },
  logoContainer: {
    paddingTop: 20,
    flexDirection: "row",
  },
  logo: {
    width: 100,
    height: 24,
    marginLeft: -20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B0B0B",
    marginLeft: -30,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  illustration: {
    width: "70%",
    height: "60%",
  },
  textContainer: {
    padding: 30,
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0B0B0B",
    marginBottom: 8,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#4A4A4A",
    lineHeight: 24,
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loginButton: {
    backgroundColor: "#00880F",
    borderRadius: 24,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    color: "#4A4A4A",
    fontSize: 14,
  },
  registerButtonTextBold: {
    color: "#00880F",
    fontWeight: "600",
  },
  disclaimerText: {
    fontSize: 12,
    color: "#687373",
    textAlign: "center",
    paddingHorizontal: 40,
    marginTop: 16,
  },
});

export default OnboardingScreen;
