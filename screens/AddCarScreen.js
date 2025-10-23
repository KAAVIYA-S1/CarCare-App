import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../services/AppContext';

export default function AddCarScreen({ navigation }) {
  const { addCar } = useApp();
  const [nickname, setNickname] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [registration, setRegistration] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = () => {
    if (!make.trim()) {
      Alert.alert('Error', 'Please enter the car brand');
      return;
    }
    if (!model.trim()) {
      Alert.alert('Error', 'Please enter the car model');
      return;
    }
    if (!year.trim()) {
      Alert.alert('Error', 'Please enter the car year');
      return;
    }

    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
      Alert.alert('Error', 'Please enter a valid year');
      return;
    }

    try {
      const carData = {
        nickname: nickname.trim() || `${make.trim()} ${model.trim()}`,
        make: make.trim(),
        model: model.trim(),
        year: year.trim(),
        registration: registration.trim().toUpperCase(),
        color: color.trim()
      };
      
      console.log('Adding car:', carData);
      addCar(carData);
      console.log('Car added successfully');

      Alert.alert(
        'Success',
        'Car added successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Add car error:', error);
      Alert.alert('Error', 'Could not add car. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Add New Car</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Car</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
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
  button: {
    backgroundColor: '#06b6d4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});