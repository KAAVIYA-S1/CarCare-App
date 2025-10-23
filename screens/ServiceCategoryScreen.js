import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useApp } from '../services/AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CATEGORY_ICONS = {
  'wash': 'local-car-wash',
  'exterior': 'directions-car',
  'paint': 'format-paint',
  'interior': 'airline-seat-recline-normal',
  'special': 'stars',
  'ceramic': 'opacity',
  'teflon': 'lens'
};

export default function ServiceCategoryScreen({ route, navigation }) {
  const { categoryId } = route.params;
  const { serviceCategories, getCategoryServices, selectedBranch, offers } = useApp();
  
  const category = Object.entries(serviceCategories).find(([_, cat]) => cat.id === categoryId)?.[0];
  const services = getCategoryServices(categoryId);

  if (!category) return (
    <View style={styles.container}>
      <Text>Category not found</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name={CATEGORY_ICONS[categoryId] || 'category'} size={40} color="#06b6d4" />
        <Text style={styles.title}>{category}</Text>
        <Text style={styles.subtitle}>Starting from ₹{serviceCategories[category].basePrice}</Text>
      </View>

      {/* Active Offers */}
      {offers.length > 0 && (
        <View style={styles.offersCard}>
          <Text style={styles.offersTitle}>Active Offers</Text>
          {offers.map(offer => (
            <View key={offer.id} style={styles.offerItem}>
              <Icon name="local-offer" size={20} color="#06b6d4" />
              <View style={styles.offerContent}>
                <Text style={styles.offerName}>{offer.title}</Text>
                <Text style={styles.offerDesc}>{offer.description}</Text>
                <Text style={styles.offerValid}>Valid till: {new Date(offer.validTill).toLocaleDateString()}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Services List */}
      <View style={styles.servicesList}>
        {services.map(service => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => navigation.navigate('Booking', { 
              serviceId: service.id,
              categoryId: categoryId
            })}
          >
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>₹{service.price}</Text>
            </View>
            <View style={styles.serviceFooter}>
              <Text style={styles.duration}>Duration: ~2 hours</Text>
              <TouchableOpacity 
                style={styles.bookButton}
                onPress={() => navigation.navigate('Booking', { 
                  serviceId: service.id,
                  categoryId: categoryId
                })}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Location Card */}
      <View style={styles.locationCard}>
        <Text style={styles.locationTitle}>Selected Branch</Text>
        {selectedBranch ? (
          <View>
            <Text style={styles.branchName}>{selectedBranch.name}</Text>
            <Text style={styles.branchAddress}>{selectedBranch.address}</Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.selectBranchButton}
            onPress={() => navigation.navigate('SelectBranch')}
          >
            <Text style={styles.selectBranchText}>Select a Branch</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 8,
    color: '#0f172a'
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b'
  },
  offersCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  offersTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#0f172a'
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  offerContent: {
    marginLeft: 12,
    flex: 1
  },
  offerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  offerDesc: {
    fontSize: 14,
    color: '#64748b',
    marginVertical: 4
  },
  offerValid: {
    fontSize: 12,
    color: '#94a3b8'
  },
  servicesList: {
    padding: 16
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a'
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#06b6d4'
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  duration: {
    fontSize: 14,
    color: '#64748b'
  },
  bookButton: {
    backgroundColor: '#06b6d4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  locationCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#0f172a'
  },
  branchName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  branchAddress: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4
  },
  selectBranchButton: {
    backgroundColor: '#06b6d4',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  selectBranchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});