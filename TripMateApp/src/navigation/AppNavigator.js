import React from 'react';

import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

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
import AllTripScreen from '../screens/AllTripScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SettingsScreen from '../../screens/SettingsScreen';

import { useAuth } from '../../context/AuthContext';

import colors from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginRoute({ navigation }) {
  return (
    <LoginScreen
      onGoToRegister={() =>
        navigation.navigate('Register')
      }
    />
  );
}

function RegisterRoute({ navigation }) {
  return (
    <RegisterScreen
      onGoToLogin={() =>
        navigation.navigate('Login')
      }
    />
  );
}

function ProfileTabScreen({ navigation }) {
  return (
    <ProfileScreen
      onBack={() =>
        navigation.navigate('Home')
      }
      onOpenSettings={() =>
        navigation.getParent()?.navigate('Settings')
      }
    />
  );
}

function SettingsRoute({ navigation }) {
  return (
    <SettingsScreen
      onBack={() =>
        navigation.goBack()
      }
      onOpenProfile={() =>
        navigation.navigate('MainTabs', {
          screen: 'Profile',
        })
      }
    />
  );
}

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
        component={ProfileTabScreen}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
            />

            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
            />

            <Stack.Screen
              name="Login"
              component={LoginRoute}
            />

            <Stack.Screen
              name="Register"
              component={RegisterRoute}
            />
          </>
        ) : (
          <>
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

            <Stack.Screen
              name="AllTrips"
              component={AllTripScreen}
            />

            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />

            <Stack.Screen
              name="Settings"
              component={SettingsRoute}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});