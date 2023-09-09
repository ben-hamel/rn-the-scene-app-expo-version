import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { Button, Text } from "react-native";
import { UserContext } from "../contexts/context";
import {
  HomeScreen,
  ProfileScreen,
  CategoryDetailScreen,
  UserDetailScreen,
  EditProfileScreen,
  EditSkillsScreen,
  AddContentScreen,
  LoadingScreen,
  UsernameScreen,
  EditBioScreen,
} from "../screens";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const UsernameStack = createStackNavigator();
const LoadStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="home" component={HomeScreen} />
      <HomeStack.Screen
        name="CategoryDetailScreen"
        component={CategoryDetailScreen}
        options={{
          headerShown: true,
          //remote title
          headerTitle: "",
        }}
      />
      <HomeStack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
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
          headerTitle: "",
        }}
      />
      <ProfileStack.Screen
        name="EditSkillsScreen"
        component={EditSkillsScreen}
        options={() => ({
          headerShown: true,
          headerTitle: "",
          headerRight: () => <Button title="Done" />,
        })}
      />
      <ProfileStack.Screen
        name="EditBioScreen"
        component={EditBioScreen}
        options={() => ({
          headerShown: true,
          headerTitle: "",
          headerRight: () => <Button title="Done" />,
        })}
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
        {/* <Tab.Screen name="TestScreen" component={TestScreen} /> */}
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    );
  }
};
