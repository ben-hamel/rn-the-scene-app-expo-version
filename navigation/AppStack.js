import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { UserContext } from "../contexts/context";

import {
  HomeScreen,
  TestScreen,
  ProfileScreen,
  CategoryDetailScreen,
  UserDetailScreen,
  EditProfileScreen,
  EditSkillsScreen,
  AddContentScreen,
  LoadingScreen,
  UsernameScreen,
} from "../screens";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const UsernameStack = createStackNavigator();
const LoadStack = createStackNavigator();

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

const UsernameStackScreen = () => {
  return (
    <UsernameStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <UsernameStack.Screen name="UsernameScreen" component={UsernameScreen} />
    </UsernameStack.Navigator>
  );
};

const LoadStackScreen = () => {
  return (
    <LoadStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoadStack.Screen name="LoadingScreen" component={LoadingScreen} />
    </LoadStack.Navigator>
  );
};

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
  const { user, username, isUsernameLoading } = useContext(UserContext);

  if (isUsernameLoading) {
    return <LoadStackScreen />;
  }

  if (!username && user) {
    return <UsernameStackScreen />;
  }

  const iconNames = {
    Home: { focused: "home", unfocused: "home-outline" },
    AddContent: { focused: "add-circle", unfocused: "add-circle-outline" },
    TestScreen: { focused: "ios-list", unfocused: "ios-list-outline" },
    Profile: { focused: "person", unfocused: "person-outline" },
  };

  if (username !== null) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName =
              iconNames[route.name][focused ? "focused" : "unfocused"];

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="AddContent" component={AddContentScreen} />
        <Tab.Screen name="TestScreen" component={TestScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    );
  }
};
