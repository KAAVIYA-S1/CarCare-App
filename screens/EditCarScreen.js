import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../services/AppContext';

export default function EditCarScreen({ route, navigation }) {
  const { carId } = route.params;
  const { getCarById, updateCar, deleteCar } = useApp();
  const car = getCarById(carId);

  const [nickname, setNickname] = useState(car?.nickname || '');
  const [make, setMake] = useState(car?.make || '');
  const [model, setModel] = useState(car?.model || '');
  const [year, setYear] = useState(car?.year || '');
  const [registration, setRegistration] = useState(car?.registration || '');
  const [color, setColor] = useState(car?.color || '');

  const handleUpdate = () => {
    if (!make.trim() || !model.trim() || !year.trim()) {
      Alert.alert('Error', 'Please fill required fields (Brand, Model, Year)');
      return;
    }

    updateCar(carId, {
      nickname: nickname.trim() || `${make.trim()} ${model.trim()}`,
      make: make.trim(),
      model: model.trim(),
      year: year.trim(),
      registration: registration.trim().toUpperCase(),
      color: color.trim()
    });

    Alert.alert('Success', 'Car updated successfully', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Car',
      'Are you sure you want to delete this car?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCar(carId);
            navigation.navigate('YourCars');
          }
        }
      ]
    );
  };

  if (!car) {
    return (
      <View style={styles.container}>
        <Text>Car not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Car</Text>

      <Text style={styles.label}>Car Name / Nickname</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder="e.g. My Toyota (optional)"
      />

      <Text style={styles.label}>Brand</Text>
      <TextInput
        style={styles.input}
        value={make}
        onChangeText={setMake}
        placeholder="e.g. Toyota"
      />

      <Text style={styles.label}>Model</Text>
      <TextInput
        style={styles.input}
        value={model}
        onChangeText={setModel}
        placeholder="e.g. Camry"
      />

      <Text style={styles.label}>Year</Text>
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={setYear}
        placeholder="e.g. 2020"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Number Plate (Optional)</Text>
      <TextInput
        style={styles.input}
        value={registration}
        onChangeText={setRegistration}
        placeholder="e.g. ABC123"
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Color</Text>
      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
        placeholder="e.g. White, Black, Red"
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Car</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Car</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#0f172a'
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#334155'
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16
  },
  updateButton: {
    backgroundColor: '#06b6d4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});