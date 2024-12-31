import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Animated, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const FeedbackModal = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [comment, setComment] = useState("");
  const slideAnim = useState(new Animated.Value(SCREEN_HEIGHT))[0];

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleOptionToggle = option => {
    setSelectedOptions(prev => (prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]));
  };

  const feedbackOptions = [
    { id: "respon", label: "😍 Respon" },
    { id: "solusi", label: "😋 Solusi" },
    { id: "biaya", label: "🤑 Biaya" },
    { id: "kenyamanan", label: "🤗 Kenyamanan" },
    { id: "kepuasan", label: "✨ Kepuasan" },
    { id: "kualitas", label: "🚀 Kualitas" },
  ];

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Gimana bantuannya?</Text>
          </View>

          {/* Star Rating */}
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <MaterialIcons name={star <= rating ? "star" : "star-border"} size={32} color={star <= rating ? "#FFA500" : "#BDBDBD"} />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subtitle}>Apa yang kamu suka dari GoHelp ini?</Text>

          {/* Feedback Options */}
          <View style={styles.optionsContainer}>
            {feedbackOptions.map(option => (
              <TouchableOpacity key={option.id} style={[styles.optionButton, selectedOptions.includes(option.id) && styles.optionButtonSelected]} onPress={() => handleOptionToggle(option.id)}>
                <Text style={[styles.optionText, selectedOptions.includes(option.id) && styles.optionTextSelected]}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subtitle}>Punya sepatah dua patah kata?</Text>
          <TextInput style={styles.input} placeholder="Sambunyiin nama diri ulasan" value={comment} onChangeText={setComment} multiline />

          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>Kirim</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BDBDBD",
  },
  optionButtonSelected: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },
  optionText: {
    color: "#666",
  },
  optionTextSelected: {
    color: "#2E7D32",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FeedbackModal;
