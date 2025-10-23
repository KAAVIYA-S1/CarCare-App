import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../services/AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

export default function YourCarsScreen({navigation}){
  const { cars } = useApp();
  const [refreshKey, setRefreshKey] = useState(0);
  
  useFocusEffect(
    React.useCallback(() => {
      console.log('YourCarsScreen focused, current cars:', cars);
      setRefreshKey(prev => prev + 1);
    }, [cars])
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cars</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddCar')}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {cars.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="directions-car" size={48} color="#cbd5e1" />
          <Text style={styles.emptyText}>No cars added yet</Text>
          <TouchableOpacity 
            style={styles.addFirstButton}
            onPress={() => navigation.navigate('AddCar')}
          >
            <Text style={styles.addFirstButtonText}>Add Your First Car</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList 
          data={cars} 
          keyExtractor={i => i.id}
          extraData={refreshKey}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('EditCar', {carId: item.id})}
            >
              <View style={styles.cardContent}>
                <Icon name="directions-car" size={24} color="#06b6d4" />
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{item.nickname || `${item.make} ${item.model}`}</Text>
                  <Text style={styles.carDetails}>
                    {item.year} {item.color ? `• ${item.color}` : ''} {item.registration ? `• ${item.registration}` : ''}
                  </Text>
                </View>
                <Icon name="chevron-right" size={24} color="#94a3b8" />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a'
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContent: {
    padding: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden'
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12
  },
  carInfo: {
    flex: 1
  },
  carName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  carDetails: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 12,
    marginBottom: 24
  },
  addFirstButton: {
    backgroundColor: '#06b6d4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  addFirstButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
