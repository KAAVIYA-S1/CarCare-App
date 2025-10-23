import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../services/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, getCartTotal, clearCart } = useCart();

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed!',
      `Your order of $${getCartTotal().toFixed(2)} has been placed successfully.`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {cartItems.map(item => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>
              {item.quantity} x {item.price} = ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressText}>123 Main Street{'\n'}City, State 12345</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text style={styles.paymentText}>Credit Card ending in ****1234</Text>
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Total: ${getCartTotal().toFixed(2)}</Text>
        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
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
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#06b6d4',
    marginBottom: 12
  },
  orderItem: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  itemDetails: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4
  },
  addressText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24
  },
  paymentText: {
    fontSize: 16,
    color: '#374151'
  },
  totalSection: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 20,
    alignItems: 'center'
  },
  totalText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#06b6d4',
    marginBottom: 20
  },
  placeOrderBtn: {
    backgroundColor: '#06b6d4',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center'
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});