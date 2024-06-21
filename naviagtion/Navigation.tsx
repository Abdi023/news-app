import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import NewsOverview from "../screens/NewsOverview";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../screens/Home";
import Saved from "../screens/Saved";

const stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon(props) {
            return (
              <Icon
                // size={10}
                name={props.focused ? "home-outline" : "home"}
                {...props}
              />
            );
          },
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon(props) {
            return (
              <Icon
                // size={10}
                name={props.focused ? "content-save-all" : "content-save-all-outline"}
                {...props}
              />
            );
          },
        }}
        name="Saved"
        component={Saved}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <stack.Screen
            options={{}}
            name="NewsOverview"
            component={NewsOverview}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
