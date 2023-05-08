import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

// import { useNavigation } from "@react-navigation/native";

import {
  HomeScreen,
  TestScreen,
  ProfileScreen,
  CategoryDetailScreen,
  UserDetailScreen,
  EditProfileScreen,
  EditSkillsScreen,
} from "../screens";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="home" component={HomeScreen} />
      {/* <HomeStack.Screen name="TestScreen" component={TestScreen} /> */}
      <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <HomeStack.Screen
        name="CategoryDetailScreen"
        component={CategoryDetailScreen}
      />
      <HomeStack.Screen name="UserDetailScreen" component={UserDetailScreen} />
      <HomeStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </HomeStack.Navigator>
  );
}

const ProfileStackScreen = () => {
  const navigation = useNavigation();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          presentation: "modal",
          headerRight: () => (
            <Button
              onPress={() => {
                // navigate to profile screen
                navigation.navigate("ProfileScreen");
              }}
              title="Save"
            />
          ),
          headerLeft: () => (
            <Button
              onPress={() => {
                // go back to the previous screen
                navigation.navigate("ProfileScreen");
              }}
              title="Cancel"
            />
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditSkillsScreen"
        component={EditSkillsScreen}
      />
    </ProfileStack.Navigator>
  );
};

export const AppStack = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "TestScreen") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="TestScreen" component={TestScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};
