import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const quickActions = [
  {
    id: "1",
    icon: "email",
    color: "#FF5C1F",
    backgroundColor: "#FFF0EB",
  },
  {
    id: "2",
    icon: "help-circle",
    color: "#00AA13",
    backgroundColor: "#E8F5E9",
  },
];

const chats = [
  {
    id: "1",
    name: "Farel",
    message: "You may have a new message",
    time: "14:35",
    avatar: "👤",
  },
];

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <View style={styles.quickActions}>
            {quickActions.map(action => (
              <TouchableOpacity key={action.id} style={[styles.actionButton, { backgroundColor: action.backgroundColor }]}>
                <Icon name={action.icon} size={24} color={action.color} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chat List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your chats</Text>
          {chats.map(chat => (
            <TouchableOpacity key={chat.id} style={styles.chatItem}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{chat.avatar}</Text>
              </View>
              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <Text style={styles.chatMessage}>{chat.message}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F6F6F6",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1C",
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1C1C1C",
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1C",
  },
  chatTime: {
    fontSize: 12,
    color: "#687373",
  },
  chatMessage: {
    fontSize: 14,
    color: "#687373",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#00AA13",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default ChatScreen;
