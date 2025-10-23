import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../services/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-cart" size={64} color="#cbd5e1" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity 
          style={styles.shopButton}
          onPress={() => navigation.navigate('Brands')}
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsList}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityBtn}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Icon name="remove" size={20} color="#06b6d4" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityBtn}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Icon name="add" size={20} color="#06b6d4" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.removeBtn}
                onPress={() => removeFromCart(item.id)}
              >
                <Icon name="delete" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.summary}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total: </Text>
          <Text style={styles.totalAmount}>${getCartTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 18,
    color: '#64748b',
    marginTop: 16,
    marginBottom: 24
  },
  shopButton: {
    backgroundColor: '#06b6d4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  itemsList: {
    flex: 1,
    padding: 16
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4
  },
  itemPrice: {
    fontSize: 14,
    color: '#06b6d4',
    fontWeight: '600'
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center'
  },
  removeBtn: {
    marginLeft: 12,
    padding: 8
  },
  summary: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#f8fafc'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a'
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#06b6d4'
  },
  checkoutBtn: {
    backgroundColor: '#06b6d4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});