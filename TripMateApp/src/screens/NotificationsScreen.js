import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import colors from '../theme/colors';

const notifications = [
  {
    id: '1',
    title: 'Trip reminder',
    message:
      'Blue Mountains Adventure starts soon. Remember to check your meeting point.',
    icon: 'calendar-outline',
    time: '10 min ago',
  },

  {
    id: '2',
    title: 'New destination available',
    message:
      'A new student weekend trip has been added to TripMate.',
    icon: 'airplane-outline',
    time: '2 hours ago',
  },

  {
    id: '3',
    title: 'Travel tip',
    message:
      'Save your favourite destinations so you can find them easily later.',
    icon: 'heart-outline',
    time: 'Yesterday',
  },
];

export default function NotificationsScreen({
  navigation,
}) {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Notifications
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <View style={styles.iconBox}>
              <Ionicons
                name={item.icon}
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.message}>
                {item.message}
              </Text>

              <Text style={styles.time}>
                {item.time}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    height: 58,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },

  list: {
    padding: 20,
  },

  notificationCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 17,
    borderRadius: 19,
    marginBottom: 13,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 13,
  },

  title: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
  },

  message: {
    color: colors.textSecondary,
    marginTop: 5,
    lineHeight: 19,
  },

  time: {
    color: colors.primary,
    marginTop: 7,
    fontSize: 11,
    fontWeight: '600',
  },
});