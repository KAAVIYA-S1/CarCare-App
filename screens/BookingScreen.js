import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Platform, TextInput, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '../services/AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const SERVICE_TYPES = [
  { id: 'wash', name: 'Car Wash', icon: 'local-car-wash', price: '₹999' },
  { id: 'exterior', name: 'Exterior', icon: 'directions-car', price: '₹999' },
  { id: 'paint', name: 'Paint Protection', icon: 'format-paint', price: '₹999' },
  { id: 'interior', name: 'Interior Detailing', icon: 'airline-seat-recline-normal', price: '₹999' },
  { id: 'special', name: 'Special Treatment', icon: 'stars', price: '₹999' },
  { id: 'ceramic', name: 'Ceramic Booth', icon: 'opacity', price: '₹999' },
  { id: 'teflon', name: 'Teflon Coating', icon: 'lens', price: '₹1999' },
  { id: 'engine', name: 'Engine Care', icon: 'engineering', price: '₹1499' }
];
const TIME_SLOTS = ['Morning','Afternoon','Evening'];
const PAYMENT_METHODS = ['UPI','Wallet','Card','Cash'];

export default function BookingScreen({ navigation }){
  const { addBooking, cars } = useApp();
  const [selectedCar, setSelectedCar] = useState(null);
  const [service, setService] = useState(SERVICE_TYPES[0].id);
  const [timeSlot,setTimeSlot] = useState(TIME_SLOTS[0]);
  const [payment,setPayment] = useState(PAYMENT_METHODS[0]);
  const [date,setDate] = useState(new Date());
  const [showPicker,setShowPicker] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (cars.length > 0 && !selectedCar) {
        setSelectedCar(cars[0].id);
      }
    }, [cars, selectedCar])
  );

  // Show empty state if no cars
  if (cars.length === 0) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Book a Service</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>No Cars Available</Text>
          <Text style={styles.emptyText}>Please add a car first to book a service.</Text>
          <TouchableOpacity 
            style={styles.addCarButton}
            onPress={() => navigation.navigate('AddCar')}
          >
            <Icon name="add-circle-outline" size={24} color="#06b6d4" />
            <Text style={styles.addCarText}>Add Your First Car</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const isFormValid = () => {
    return selectedCar && service && timeSlot && payment && date;
  };

  const handleConfirmBooking = () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (!selectedCar) {
      Alert.alert('Error', 'Please select a car first');
      return;
    }

    const selectedCarData = cars.find(c => c.id === selectedCar);
    const selectedServiceData = SERVICE_TYPES.find(s => s.id === service);
    
    const bookingData = {
      carId: selectedCar,
      carTitle: selectedCarData ? `${selectedCarData.make} ${selectedCarData.model}` : 'Unknown Car',
      service: selectedServiceData.name,
      timeSlot,
      payment,
      date: date.toISOString(),
      status: 'upcoming'
    };

    try {
      addBooking(bookingData);
      
      // Show success message
      Alert.alert(
        'Booking Confirmed Successfully!',
        `Your ${selectedServiceData.name} service has been booked for ${date.toDateString()} during ${timeSlot}.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form state
              setSelectedCar(cars.length > 0 ? cars[0].id : null);
              setService(SERVICE_TYPES[0].id);
              setTimeSlot(TIME_SLOTS[0]);
              setPayment(PAYMENT_METHODS[0]);
              setDate(new Date());
              
              // Navigate to Home after brief delay
              setTimeout(() => {
                navigation.navigate('Home');
              }, 1000);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Book a Service</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Your Car</Text>
        <View style={styles.carsContainer}>
        {cars.map(car => (
          <TouchableOpacity
            key={car.id}
            style={[styles.carCard, selectedCar === car.id && styles.selectedCar]}
            onPress={() => setSelectedCar(car.id)}
          >
            <Icon name="directions-car" size={24} color={selectedCar === car.id ? '#fff' : '#000'} />
            <Text style={[styles.carText, selectedCar === car.id && styles.selectedCarText]}>
              {car.nickname || `${car.make} ${car.model}`}
            </Text>
            <Text style={[styles.carSubtext, selectedCar === car.id && styles.selectedCarText]}>
              {car.year} {car.color ? `• ${car.color}` : ''} {car.registration ? `• ${car.registration}` : ''}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.addCarButton}
          onPress={() => {
            navigation.navigate('AddCar');
          }}
        >
          <Icon name="add-circle-outline" size={24} color="#06b6d4" />
          <Text style={styles.addCarText}>Add New Car</Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Package</Text>
        <View style={styles.serviceContainer}>
          {SERVICE_TYPES.map(serviceType => (
            <TouchableOpacity 
              key={serviceType.id} 
              style={[styles.serviceCard, service === serviceType.id && styles.serviceCardActive]} 
              onPress={() => setService(serviceType.id)}
            >
              <Icon name={serviceType.icon} size={24} color={service === serviceType.id ? '#06b6d4' : '#64748b'} />
              <Text style={[styles.serviceName, service === serviceType.id && styles.serviceNameActive]}>{serviceType.name}</Text>
              <Text style={styles.servicePrice}>From {serviceType.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferred Time Slot</Text>
        <View style={styles.timeSlotContainer}>
          {TIME_SLOTS.map(slot=> (
            <TouchableOpacity key={slot} style={[styles.timeSlot, timeSlot===slot && styles.timeSlotActive]} onPress={()=>setTimeSlot(slot)}>
              <Text style={[styles.timeSlotText, timeSlot===slot && styles.timeSlotTextActive]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentContainer}>
          {PAYMENT_METHODS.map(method=> (
            <TouchableOpacity key={method} style={[styles.paymentOption, payment===method && styles.paymentOptionActive]} onPress={()=>setPayment(method)}>
              <View style={[styles.radio, payment===method && styles.radioActive]} />
              <Text style={styles.paymentText}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateButtonText}>{date.toDateString()}</Text>
          <Icon name="calendar-today" size={20} color="#06b6d4" />
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker 
            value={date} 
            mode="date" 
            display="default" 
            onChange={(e,d)=>{ 
              setShowPicker(false); 
              if (d) setDate(d); 
            }} 
          />
        )}
      </View>

      <TouchableOpacity 
        style={[styles.confirmButton, !isFormValid() && styles.confirmButtonDisabled]}
        onPress={handleConfirmBooking}
        disabled={!isFormValid()}
      >
        <Text style={[styles.confirmButtonText, !isFormValid() && styles.confirmButtonTextDisabled]}>Confirm Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.historyButton}
        onPress={() => navigation.navigate('BookingHistory')}
      >
        <Icon name="history" size={20} color="#06b6d4" />
        <Text style={styles.historyButtonText}>View Booking History</Text>
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
    marginBottom: 20,
    color: '#0f172a'
  },
  section: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#0f172a'
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8
  },
  timeSlotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeSlot: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  timeSlotActive: {
    backgroundColor: '#06b6d4',
    borderColor: '#06b6d4'
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151'
  },
  timeSlotTextActive: {
    color: '#fff'
  },
  paymentContainer: {
    gap: 12
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  paymentOptionActive: {
    borderColor: '#06b6d4',
    backgroundColor: '#f0fdff'
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12
  },
  radioActive: {
    borderColor: '#06b6d4',
    backgroundColor: '#06b6d4'
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#374151'
  },
  carsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16
  },
  carCard: {
    width: '47%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  selectedCar: {
    backgroundColor: '#06b6d4',
    borderColor: '#0891b2'
  },
  carText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4
  },
  carSubtext: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2
  },
  selectedCarText: {
    color: '#fff'
  },
  addCarButton: {
    width: '47%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1'
  },
  addCarText: {
    color: '#06b6d4',
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500'
  },
  confirmButton: {
    backgroundColor: '#06b6d4',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#374151'
  },
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  serviceCard: {
    width: '48%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  serviceCardActive: {
    borderColor: '#06b6d4',
    backgroundColor: '#f0fdff',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 8,
    textAlign: 'center'
  },
  serviceNameActive: {
    color: '#06b6d4'
  },
  servicePrice: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748b',
    marginTop: 4
  },
  confirmButtonDisabled: {
    backgroundColor: '#cbd5e1',
    opacity: 0.6
  },
  confirmButtonTextDisabled: {
    color: '#9ca3af'
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '400'
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#06b6d4',
    marginTop: 12
  },
  historyButtonText: {
    color: '#06b6d4',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  }
});
