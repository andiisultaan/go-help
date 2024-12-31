import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from "react-native";

// Import your actual HomeScreen component
import HomeScreen from "../screens/HomeScreen";
import GoHelpScreen from "../screens/GohelpScreen";
import OrderScreen from "../screens/OrderScreen";
import PromoScreen from "../screens/PromoScreen";
import ChatScreen from "../screens/ChatScreen";
import LocationPicker from "../screens/LocationPicker";
import DeliveryDetails from "../screens/SetLocationDetails";
import SetDestination from "../screens/SetDestination";
import BookingDetails from "../screens/BookingDetails";
import TrackBooking from "../screens/TrackingBooking";
import ProfileScreen from "../screens/ProfileScreen";
import PaymentSuccess from "../components/PaymentSuccess";
import BantuanKendaraan from "../screens/BantuanKendaraan";
import BantuanKendaraanDetails from "../screens/BookingKendaraanDetails";
import BantuanLainnya from "../screens/BantuanLainnya";
import BantuanLainnyaDetails from "../screens/BantuanLainnyaDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="GoHelpScreen" component={GoHelpScreen} />
      <HomeStack.Screen name="LocationPicker" component={LocationPicker} />
      <HomeStack.Screen name="SetLocationDetails" component={DeliveryDetails} />
      <HomeStack.Screen name="SetDestination" component={SetDestination} />
      <HomeStack.Screen name="BookingDetails" component={BookingDetails} />
      <HomeStack.Screen name="TrackingBooking" component={TrackBooking} />
      <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <HomeStack.Screen name="BantuanKendaraan" component={BantuanKendaraan} />
      <HomeStack.Screen name="BantuanKendaraanDetails" component={BantuanKendaraanDetails} />
      <HomeStack.Screen name="BantuanLainnya" component={BantuanLainnya} />
      <HomeStack.Screen name="BantuanLainnyaDetails" component={BantuanLainnyaDetails} />
      <HomeStack.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{
          presentation: "fullScreenModal",
          animationEnabled: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F6F6F6",
          height: 100,
          paddingTop: 20,
          paddingBottom: 16,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Promos") {
            iconName = focused ? "ticket-percent" : "ticket-percent-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chat" : "chat-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "reorder-horizontal" : "reorder-horizontal";
          }

          return (
            <View style={styles.tabItem}>
              <Icon name={iconName} size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>{route.name}</Text>
            </View>
          );
        },
        tabBarActiveTintColor: "#00AA13",
        tabBarInactiveTintColor: "#687373",
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Promos" component={PromoScreen} />
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

const StackHolder = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default StackHolder;
