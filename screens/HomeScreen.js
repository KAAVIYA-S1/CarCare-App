import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useApp } from '../services/AppContext';
import { useAuth } from '../services/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from '../components/Sidebar';

export default function HomeScreen({ navigation }) {
  const { serviceCategories, offers, selectedBranch } = useApp();
  const { user } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Premium Car Care Services</Text>
        <Text style={styles.heroSubtitle}>Professional detailing for your vehicle</Text>
      </View>



      {/* Service Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.categoriesGrid}>
          {Object.entries(serviceCategories).map(([name, category]) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('ServiceCategory', { categoryId: category.id })}
            >
              <Icon 
                name={
                  category.id === 'wash' ? 'local-car-wash' :
                  category.id === 'exterior' ? 'directions-car' :
                  category.id === 'paint' ? 'format-paint' :
                  category.id === 'interior' ? 'airline-seat-recline-normal' :
                  category.id === 'special' ? 'stars' :
                  category.id === 'ceramic' ? 'opacity' :
                  category.id === 'engine' ? 'engineering' :
                  'lens'
                }
                size={32}
                color="#06b6d4"
              />
              <Text style={styles.categoryName}>{name}</Text>
              <Text style={styles.categoryPrice}>From ₹{category.basePrice}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Selected Branch */}
      {selectedBranch && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Selected Branch</Text>
          <View style={styles.branchCard}>
            <View style={styles.branchInfo}>
              <Text style={styles.branchName}>{selectedBranch.name}</Text>
              <Text style={styles.branchAddress}>{selectedBranch.address}</Text>
            </View>
            <TouchableOpacity
              style={styles.changeBranchButton}
              onPress={() => navigation.navigate('SelectBranch')}
            >
              <Text style={styles.changeBranchText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}



      {/* Menu Button */}
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => setSidebarVisible(true)}
      >
        <Icon name="menu" size={24} color="#fff" />
        <Text style={styles.menuButtonText}>Menu</Text>
      </TouchableOpacity>
      
      <Sidebar 
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        navigation={navigation}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  hero: {
    padding: 24,
    backgroundColor: '#f0faff',
    alignItems: 'center'
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center'
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '400'
  },

  section: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16
  },
  offersScroll: {
    marginHorizontal: -16
  },
  offerCard: {
    width: 280,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a'
  },
  offerDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8
  },
  offerValidity: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 8
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    alignItems: 'center'
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 12,
    textAlign: 'center'
  },
  categoryPrice: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '400'
  },
  branchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  branchInfo: {
    flex: 1
  },
  branchName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  branchAddress: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '400'
  },
  changeBranchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#06b6d4',
    borderRadius: 6
  },
  changeBranchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  membershipBanner: {
    margin: 16,
    padding: 20,
    backgroundColor: '#06b6d4',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  membershipContent: {
    flex: 1
  },
  membershipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff'
  },
  membershipSubtitle: {
    fontSize: 14,
    color: '#e0f2fe',
    marginTop: 4
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#06b6d4',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  }
});
