import React, { useState, useRef, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, StyleSheet, Animated, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImageSlider from "../components/ImageSlider";

const helpItems = [
  {
    id: "1",
    title: "Keamanan Pribadi",
    subtitle: "Atur fitur keamanan untuk diri sendiri",
    icon: "shield-account",
    label: "LocationPicker",
  },
  {
    id: "2",
    title: "Bantuan Kendaraan",
    subtitle: "Bantuan untuk kendaraan",
    icon: "car",
  },
  {
    id: "3",
    title: "Bantuan Lainnya",
    subtitle: "Pilihan bantuan yang tersedia",
    icon: "pencil",
  },
];

const bannerImages = [require("../assets/promo1.jpg"), require("../assets/help.png"), require("../assets/promo3.jpg")];

const GoHelpScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#1C1C1C" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Icon name="hand-front-right" size={24} color="#00AA13" />
            <Text style={styles.headerTitle}>GoHelp</Text>
          </View>
          <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
            <Icon name="information" size={24} color="#1C1C1C" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.bannerContainer}>
            <ImageSlider images={bannerImages} interval={5000} />
          </View>

          {/* Help Section */}
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>What do you need help with?</Text>

            {/* Help Items */}
            <View style={styles.cardContainer}>
              {helpItems.map(item => (
                <TouchableOpacity key={item.id} style={styles.card} onPress={() => navigation.navigate(item.label)}>
                  <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      <Icon name={item.icon} size={24} color="#00AA13" />
                    </View>
                    <View style={styles.cardTextContainer}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#687373" style={styles.chevronIcon} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal animationType="none" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeModal}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [
                  {
                    translateY: slideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [Dimensions.get("window").height, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <ImageSlider images={[require("../assets/help.png")]} interval={5000} />
            <Text style={styles.modalTitle}>Pilih Jenis Bantuan yang kamu butuhkan!</Text>
            <Text style={styles.modalDescription}>Kami akan membantu anda selalu dengan permasalahan yang anda alami. Kami siap sigap membantu anda !</Text>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>ok, got it</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F6F6F6",
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginLeft: 8,
  },
  infoButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  bannerContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#F6F6F6",
  },
  helpSection: {
    padding: 16,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1C",
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "column",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1C",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#687373",
  },
  chevronIcon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    alignItems: "center",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1C1C1C",
    marginBottom: 12,
  },
  modalDescription: {
    textAlign: "center",
    color: "#666666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00AA13",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GoHelpScreen;
