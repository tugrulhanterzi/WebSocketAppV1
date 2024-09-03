import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SensorScreen from "../screens/SensorSceen";
import GraphScreen from "../screens/GraphScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Sensor Data") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Graph") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#61DAFB",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sensor Data" component={SensorScreen} />
      <Tab.Screen name="Graph" component={GraphScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
