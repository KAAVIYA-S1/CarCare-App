import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BrandsScreen({ navigation }) {
  const categories = [
    {
      id: 'exterior',
      title: 'Exterior Care Products',
      icon: 'directions-car',
      items: ['Car shampoos', 'Wax and polish', 'Ceramic coatings', 'Quick detailers', 'Tire dressings', 'Glass cleaners']
    },
    {
      id: 'interior',
      title: 'Interior Care Products',
      icon: 'airline-seat-recline-normal',
      items: ['Dashboard protectants', 'Leather cleaners', 'Fabric cleaners', 'Odor eliminators', 'Carpet shampoos']
    },
    {
      id: 'tools',
      title: 'Tools & Accessories',
      icon: 'build',
      items: ['Microfiber towels', 'Brushes', 'Applicator pads', 'Buckets', 'Spray bottles']
    },
    {
      id: 'maintenance',
      title: 'Maintenance Products',
      icon: 'settings',
      items: ['Engine degreasers', 'Tire inflators', 'Coolants', 'Fuel cleaners', 'Battery chargers']
    },
    {
      id: 'aircare',
      title: 'Air Care & Fragrance',
      icon: 'air',
      items: ['Air fresheners', 'Vent clips', 'Gel sprays', 'Car diffusers']
    },
    {
      id: 'electronics',
      title: 'Electronics & Accessories',
      icon: 'electrical-services',
      items: ['Dash cams', 'Phone holders', 'Wireless chargers', 'LED lights', 'Car vacuums']
    },
    {
      id: 'bundles',
      title: 'Gift & Bundle Packs',
      icon: 'card-giftcard',
      items: ['Weekend Wash Kit', 'Interior Refresh Kit', 'New Car Starter Pack', 'Premium Detail Bundle']
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Product Categories</Text>
      {categories.map(category => (
        <TouchableOpacity 
          key={category.id} 
          style={styles.categoryCard}
          onPress={() => navigation.navigate('ProductDetails', { 
            categoryId: category.id, 
            categoryTitle: category.title 
          })}
        >
          <View style={styles.categoryHeader}>
            <Icon name={category.icon} size={24} color="#06b6d4" />
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>
          <View style={styles.itemsList}>
            {category.items.map((item, index) => (
              <Text key={index} style={styles.item}>• {item}</Text>
            ))}
          </View>
        </TouchableOpacity>
      ))}
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
    color: '#0f172a',
    marginBottom: 20
  },
  categoryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 12
  },
  itemsList: {
    marginLeft: 36
  },
  item: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '400'
  }
});