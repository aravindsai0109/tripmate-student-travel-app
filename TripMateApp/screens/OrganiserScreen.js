import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  useAuth,
} from '../context/AuthContext';

import {
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
} from '../src/services/tripService';

import colors from '../src/theme/colors';

const EMPTY_FORM = {
  title: '',
  destination: '',
  category: '',
  date: '',
  duration: '',
  meetingPoint: '',
  price: '',
  capacity: '',
  rating: '5',
  reviews: '0',
  difficulty: 'Easy',
  image: '',
  description: '',
};

export default function OrganiserScreen({
  navigation,
}) {
  const { user } = useAuth();

  const [trips, setTrips] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [editingTrip, setEditingTrip] =
    useState(null);

  const [form, setForm] =
    useState(EMPTY_FORM);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);

      const result =
        await getTrips();

      setTrips(result);
    } catch (error) {
      Alert.alert(
        'Unable to load trips',
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openCreate = () => {
    setEditingTrip(null);
    setForm(EMPTY_FORM);
    setModalVisible(true);
  };

  const openEdit = (trip) => {
    setEditingTrip(trip);

    setForm({
      title: trip.title || '',
      destination:
        trip.destination || '',
      category:
        trip.category || '',
      date:
        trip.date || '',
      duration:
        trip.duration || '',
      meetingPoint:
        trip.meetingPoint || '',
      price:
        String(trip.price ?? ''),
      capacity:
        String(trip.capacity ?? ''),
      rating:
        String(trip.rating ?? '5'),
      reviews:
        String(trip.reviews ?? '0'),
      difficulty:
        trip.difficulty || 'Easy',
      image:
        trip.image || '',
      description:
        trip.description || '',
    });

    setModalVisible(true);
  };

  const handleSave = async () => {
    if (user?.role !== 'organiser') {
      Alert.alert(
        'Access denied',
        'Only organisers can manage trips.'
      );

      return;
    }

    try {
      setSaving(true);

      if (editingTrip) {
        await updateTrip(
          editingTrip.id,
          form
        );

        Alert.alert(
          'Trip Updated',
          'The trip was updated successfully.'
        );
      } else {
        await createTrip(form);

        Alert.alert(
          'Trip Created',
          'The new trip was created successfully.'
        );
      }

      setModalVisible(false);

      await loadTrips();
    } catch (error) {
      Alert.alert(
        'Unable to save trip',
        error.message
      );
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (trip) => {
    Alert.alert(
      'Delete Trip',
      `Are you sure you want to delete "${trip.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            handleDelete(trip),
        },
      ]
    );
  };

  const handleDelete = async (
    trip
  ) => {
    if (user?.role !== 'organiser') {
      Alert.alert(
        'Access denied',
        'Only organisers can delete trips.'
      );

      return;
    }

    try {
      await deleteTrip(trip.id);

      Alert.alert(
        'Trip Deleted',
        'The trip was removed successfully.'
      );

      await loadTrips();
    } catch (error) {
      Alert.alert(
        'Unable to delete trip',
        error.message
      );
    }
  };

  if (
    user?.role !== 'organiser'
  ) {
    return (
      <SafeAreaView
        style={styles.page}
      >
        <View style={styles.center}>
          <Ionicons
            name="lock-closed-outline"
            size={50}
            color={colors.textSecondary}
          />

          <Text
            style={styles.accessTitle}
          >
            Access Denied
          </Text>

          <Text
            style={styles.accessText}
          >
            This area is available to
            authorised organisers only.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>
          Manage Trips
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={openCreate}
        >
          <Ionicons
            name="add"
            size={25}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        Create, edit and manage TripMate
        destinations.
      </Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text style={styles.loadingText}>
            Loading trips...
          </Text>
        </View>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) =>
            item.id
          }
          contentContainerStyle={
            styles.list
          }
          showsVerticalScrollIndicator={
            false
          }
          renderItem={({ item }) => (
            <View style={styles.tripCard}>
              <View style={styles.tripInfo}>
                <Text
                  style={styles.tripTitle}
                >
                  {item.title}
                </Text>

                <Text
                  style={
                    styles.destination
                  }
                >
                  {item.destination}
                </Text>

                <Text
                  style={styles.meta}
                >
                  ${item.price} • Capacity{' '}
                  {item.capacity} • Reserved{' '}
                  {item.reservedSpots || 0}
                </Text>
              </View>

              <View
                style={
                  styles.actionRow
                }
              >
                <TouchableOpacity
                  style={
                    styles.editButton
                  }
                  onPress={() =>
                    openEdit(item)
                  }
                >
                  <Ionicons
                    name="create-outline"
                    size={19}
                    color={
                      colors.primary
                    }
                  />

                  <Text
                    style={
                      styles.editText
                    }
                  >
                    Edit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.deleteButton
                  }
                  onPress={() =>
                    confirmDelete(item)
                  }
                >
                  <Ionicons
                    name="trash-outline"
                    size={19}
                    color="#DC2626"
                  />

                  <Text
                    style={
                      styles.deleteText
                    }
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <SafeAreaView
          style={styles.modalPage}
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
              Platform.OS === 'ios'
                ? 'padding'
                : undefined
            }
          >
            <View
              style={
                styles.modalHeader
              }
            >
              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
              >
                <Ionicons
                  name="close"
                  size={28}
                  color={colors.text}
                />
              </TouchableOpacity>

              <Text
                style={
                  styles.modalTitle
                }
              >
                {editingTrip
                  ? 'Edit Trip'
                  : 'Create Trip'}
              </Text>

              <View
                style={{ width: 28 }}
              />
            </View>

            <ScrollView
              contentContainerStyle={
                styles.form
              }
              keyboardShouldPersistTaps="handled"
            >
              <TripInput
                label="Trip Title"
                value={form.title}
                onChangeText={(v) =>
                  updateField(
                    'title',
                    v
                  )
                }
              />

              <TripInput
                label="Destination"
                value={
                  form.destination
                }
                onChangeText={(v) =>
                  updateField(
                    'destination',
                    v
                  )
                }
              />

              <TripInput
                label="Category"
                value={form.category}
                onChangeText={(v) =>
                  updateField(
                    'category',
                    v
                  )
                }
                placeholder="Beach, Mountain, City..."
              />

              <TripInput
                label="Date"
                value={form.date}
                onChangeText={(v) =>
                  updateField(
                    'date',
                    v
                  )
                }
                placeholder="12 October 2026"
              />

              <TripInput
                label="Duration"
                value={form.duration}
                onChangeText={(v) =>
                  updateField(
                    'duration',
                    v
                  )
                }
                placeholder="2 Days"
              />

              <TripInput
                label="Meeting Point"
                value={
                  form.meetingPoint
                }
                onChangeText={(v) =>
                  updateField(
                    'meetingPoint',
                    v
                  )
                }
              />

              <TripInput
                label="Price"
                value={form.price}
                keyboardType="numeric"
                onChangeText={(v) =>
                  updateField(
                    'price',
                    v
                  )
                }
              />

              <TripInput
                label="Capacity"
                value={form.capacity}
                keyboardType="number-pad"
                onChangeText={(v) =>
                  updateField(
                    'capacity',
                    v
                  )
                }
              />

              <TripInput
                label="Rating"
                value={form.rating}
                keyboardType="decimal-pad"
                onChangeText={(v) =>
                  updateField(
                    'rating',
                    v
                  )
                }
              />

              <TripInput
                label="Reviews"
                value={form.reviews}
                onChangeText={(v) =>
                  updateField(
                    'reviews',
                    v
                  )
                }
              />

              <TripInput
                label="Difficulty"
                value={
                  form.difficulty
                }
                onChangeText={(v) =>
                  updateField(
                    'difficulty',
                    v
                  )
                }
                placeholder="Easy / Moderate"
              />

              <TripInput
                label="Image URL"
                value={form.image}
                onChangeText={(v) =>
                  updateField(
                    'image',
                    v
                  )
                }
                autoCapitalize="none"
              />

              <TripInput
                label="Description"
                value={
                  form.description
                }
                onChangeText={(v) =>
                  updateField(
                    'description',
                    v
                  )
                }
                multiline
              />

              <TouchableOpacity
                style={[
                  styles.saveTripButton,
                  saving &&
                    styles.disabledButton,
                ]}
                disabled={saving}
                onPress={
                  handleSave
                }
              >
                <Text
                  style={
                    styles.saveTripText
                  }
                >
                  {saving
                    ? 'Saving...'
                    : editingTrip
                    ? 'Update Trip'
                    : 'Create Trip'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function TripInput({
  label,
  multiline,
  ...props
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        {...props}
        multiline={multiline}
        style={[
          styles.input,
          multiline &&
            styles.multilineInput,
        ]}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor:
        colors.background,
    },

    header: {
      paddingHorizontal: 20,
      paddingTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
    },

    heading: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.text,
    },

    addButton: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },

    subtitle: {
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 15,
      color:
        colors.textSecondary,
    },

    list: {
      paddingHorizontal: 20,
      paddingBottom: 30,
    },

    tripCard: {
      backgroundColor:
        colors.white,
      padding: 17,
      borderRadius: 20,
      marginBottom: 14,
    },

    tripTitle: {
      fontSize: 17,
      fontWeight: '800',
      color: colors.text,
    },

    destination: {
      marginTop: 5,
      color:
        colors.textSecondary,
    },

    meta: {
      marginTop: 7,
      color:
        colors.textSecondary,
      fontSize: 12,
    },

    actionRow: {
      flexDirection: 'row',
      marginTop: 15,
    },

    editButton: {
      flex: 1,
      paddingVertical: 11,
      backgroundColor:
        colors.primaryLight,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 7,
    },

    editText: {
      marginLeft: 5,
      color: colors.primary,
      fontWeight: '700',
    },

    deleteButton: {
      flex: 1,
      paddingVertical: 11,
      backgroundColor:
        '#FEE2E2',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 7,
    },

    deleteText: {
      marginLeft: 5,
      color: '#DC2626',
      fontWeight: '700',
    },

    center: {
      flex: 1,
      justifyContent:
        'center',
      alignItems: 'center',
      paddingHorizontal: 30,
    },

    loadingText: {
      marginTop: 10,
      color:
        colors.textSecondary,
    },

    accessTitle: {
      marginTop: 15,
      fontSize: 22,
      fontWeight: '800',
      color: colors.text,
    },

    accessText: {
      marginTop: 8,
      textAlign: 'center',
      color:
        colors.textSecondary,
    },

    modalPage: {
      flex: 1,
      backgroundColor:
        colors.background,
    },

    modalHeader: {
      height: 60,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
    },

    modalTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text,
    },

    form: {
      paddingHorizontal: 20,
      paddingBottom: 50,
    },

    field: {
      marginTop: 15,
    },

    label: {
      fontWeight: '700',
      marginBottom: 7,
      color: colors.text,
    },

    input: {
      backgroundColor:
        colors.white,
      borderWidth: 1,
      borderColor:
        colors.border,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 13,
      color: colors.text,
    },

    multilineInput: {
      minHeight: 110,
      textAlignVertical: 'top',
    },

    saveTripButton: {
      backgroundColor:
        colors.primary,
      marginTop: 25,
      paddingVertical: 17,
      borderRadius: 17,
      alignItems: 'center',
    },

    saveTripText: {
      color: '#FFFFFF',
      fontWeight: '800',
      fontSize: 16,
    },

    disabledButton: {
      opacity: 0.6,
    },
  });