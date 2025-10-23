import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../services/AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BookingHistoryScreen(){
  const { bookings, deleteBooking } = useApp();

  const handleDeleteBooking = (bookingId, serviceName) => {
    Alert.alert(
      'Delete Booking',
      `Are you sure you want to delete the ${serviceName} booking?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteBooking(bookingId);
          }
        }
      ]
    );
  };

  const renderItem = ({item})=> (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.serviceName}>{item.service}</Text>
          <Text style={styles.carName}>{item.carTitle}</Text>
          <Text style={styles.bookingDate}>{new Date(item.date).toLocaleDateString()}</Text>
          <Text style={styles.timeSlot}>{item.timeSlot} • {item.payment}</Text>
        </View>
        <View style={styles.bookingActions}>
          <View style={[styles.statusBadge, styles[`status${item.status}`]]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteBooking(item.id, item.service)}
          >
            <Icon name="delete" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (bookings.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Bookings</Text>
        <View style={styles.emptyState}>
          <Icon name="event-busy" size={64} color="#cbd5e1" />
          <Text style={styles.emptyText}>No previous bookings found</Text>
          <Text style={styles.emptySubtext}>Your booking history will appear here</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item)=>item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    marginBottom: 20,
    color: '#0f172a'
  },
  bookingCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  bookingInfo: {
    flex: 1
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4
  },
  carName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#06b6d4',
    marginBottom: 4
  },
  bookingDate: {
    fontSize: 14,
    fontWeight: '400',
    color: '#64748b',
    marginBottom: 2
  },
  timeSlot: {
    fontSize: 14,
    fontWeight: '400',
    color: '#64748b'
  },
  bookingActions: {
    alignItems: 'flex-end',
    gap: 8
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center'
  },
  statusupcoming: {
    backgroundColor: '#dbeafe'
  },
  statuspaid: {
    backgroundColor: '#dcfce7'
  },
  statuscompleted: {
    backgroundColor: '#f3e8ff'
  },
  statuscancelled: {
    backgroundColor: '#fee2e2'
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'capitalize'
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fef2f2'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 8
  },
  emptySubtext: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9ca3af',
    textAlign: 'center'
  }
});
