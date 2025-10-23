import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../services/CartContext';

const PRODUCTS = {
  exterior: [
    { name: 'Foaming Car Shampoo (pH-Balanced)', desc: 'High-foam, wax-safe shampoo that gently removes dirt and grime.', size: '1 L', price: '$9.99' },
    { name: 'Ceramic-Infused Wash Soap', desc: 'Adds SiO₂ protection while cleaning.', size: '1 L', price: '$14.99' },
    { name: 'Premium Carnauba Wax (Paste)', desc: 'Deep gloss finish and long-lasting protection.', size: '200 g', price: '$12.99' },
    { name: 'Spray Polish / Quick Wax', desc: 'Instant shine booster between washes.', size: '500 ml', price: '$10.49' },
    { name: 'Ceramic Coating Kit (9H)', desc: 'Complete DIY kit with applicators and microfiber.', size: '50 ml', price: '$59.00' },
    { name: 'Graphene Paint Protectant', desc: 'Advanced coating for extreme durability.', size: '250 ml', price: '$79.00' }
  ],
  interior: [
    { name: 'Dashboard & Vinyl Protectant', desc: 'Prevents fading, leaves satin finish.', size: '500 ml', price: '$6.99' },
    { name: 'Leather Cleaner & Conditioner', desc: 'Cleans and nourishes leather seats.', size: '500 ml', price: '$9.99' },
    { name: 'Fabric & Upholstery Cleaner', desc: 'Removes stains, safe on all fabrics.', size: '500 ml', price: '$7.49' },
    { name: 'Odor Eliminator Spray', desc: 'Neutralizes odors; fresh scent.', size: '300 ml', price: '$5.99' }
  ],
  tools: [
    { name: 'Microfiber Towels (Premium)', desc: 'Scratch-free drying and buffing.', size: 'Pack of 3', price: '$6.99' },
    { name: 'Wash Mitt (Microfiber)', desc: 'Safe paint washing mitt.', size: '1 pc', price: '$4.99' },
    { name: 'Detailing Brush Set', desc: '5 sizes for wheels and interior.', size: '5 pcs', price: '$9.99' },
    { name: 'Dual-Action Polisher', desc: 'Variable speed orbital polisher (900 W).', size: '1 unit', price: '$129.00' }
  ],
  maintenance: [
    { name: 'Engine Degreaser', desc: 'Removes oil, grease, and grime.', size: '500 ml', price: '$6.99' },
    { name: 'Tire Inflator (Portable)', desc: '12 V digital inflator with gauge.', size: '1 unit', price: '$29.00' },
    { name: 'Battery Charger (Smart)', desc: 'Automatic 12 V/6 V charger.', size: '1 unit', price: '$49.00' }
  ],
  aircare: [
    { name: 'Hanging Air Freshener', desc: 'Long-lasting paper card scents.', size: 'Pack of 3', price: '$3.49' },
    { name: 'Car Diffuser (Essential Oil)', desc: 'Reusable metal diffuser.', size: '1 unit', price: '$12.99' }
  ],
  electronics: [
    { name: 'Dash Cam (1080p)', desc: 'Loop recording, G-sensor, night vision.', size: '1 unit', price: '$59.00' },
    { name: 'Wireless Charger Mount', desc: 'Fast charging Qi mount for dashboard.', size: '1 unit', price: '$24.99' },
    { name: 'Portable Car Vacuum Cleaner', desc: '120 W handheld, HEPA filter.', size: '1 unit', price: '$29.99' }
  ],
  bundles: [
    { name: 'Weekend Wash Kit', desc: 'Shampoo, Wax, Towel, Mitt', size: 'Kit', price: '$24.99' },
    { name: 'Interior Refresh Kit', desc: 'Cleaner, Protectant, Air Freshener', size: 'Kit', price: '$19.99' },
    { name: 'Premium Detail Bundle', desc: 'Wax, Quick Detailer, Mitt, Clay Bar, Microfibers', size: 'Kit', price: '$49.99' }
  ]
};

export default function ProductDetailsScreen({ route }) {
  const { categoryId, categoryTitle } = route.params;
  const products = PRODUCTS[categoryId] || [];
  const { addToCart } = useCart();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{categoryTitle}</Text>
      {products.map((product, index) => (
        <View key={index} style={styles.productCard}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDesc}>{product.desc}</Text>
          <View style={styles.productInfo}>
            <Text style={styles.size}>{product.size}</Text>
            <Text style={styles.price}>{product.price}</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => addToCart(product)}
          >
            <Icon name="add-shopping-cart" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
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
  productCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8
  },
  productDesc: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    fontWeight: '400'
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  size: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '400'
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#06b6d4'
  },
  addButton: {
    backgroundColor: '#06b6d4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8
  }
});