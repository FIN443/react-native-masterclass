import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import colors from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? colors.black : "white",
        },
        tabBarActiveTintColor: isDark ? colors.yellow : colors.black,
        tabBarInactiveTintColor: isDark ? colors.whiteGray : colors.darkGray,
        headerStyle: {
          backgroundColor: isDark ? colors.black : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : colors.black,
        },
      }}
    >
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
