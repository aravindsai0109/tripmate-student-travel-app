import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  Ionicons,
} from '@expo/vector-icons';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import BookingScreen from '../screens/BookingScreen';

import SavedScreen from '../screens/SavedScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import ProfilePlaceholderScreen from '../screens/ProfilePlaceholderScreen';

import colors from '../theme/colors';

const Stack =
  createNativeStackNavigator();

const Tab =
  createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarShowLabel: false,

        tabBarStyle: {
          height: 68,
          paddingTop: 7,
          borderTopWidth: 0,
          elevation: 12,
          backgroundColor: colors.white,
        },

        tabBarActiveTintColor:
          colors.primary,

        tabBarInactiveTintColor:
          '#9CA3AF',

        tabBarIcon: ({
          focused,
          color,
          size,
        }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          }

          if (route.name === 'Saved') {
            iconName = focused
              ? 'heart'
              : 'heart-outline';
          }

          if (route.name === 'MyTrips') {
            iconName = focused
              ? 'airplane'
              : 'airplane-outline';
          }

          if (route.name === 'Profile') {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={23}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
      />

      <Tab.Screen
        name="MyTrips"
        component={MyTripsScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilePlaceholderScreen}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
        />

        <Stack.Screen
          name="TripDetails"
          component={TripDetailsScreen}
        />

        <Stack.Screen
          name="Booking"
          component={BookingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}