import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Sidebar({ visible, onClose, navigation }) {
  const menuItems = [
    { name: 'YourCars', label: 'Your Cars', icon: 'directions-car' },
    { name: 'BookingHistory', label: 'History', icon: 'history' },
    { name: 'EditProfile', label: 'Profile', icon: 'person' },
    { name: 'Settings', label: 'Settings', icon: 'settings' }
  ];

  const handleNavigation = (screenName) => {
    console.log('Navigating to:', screenName);
    try {
      navigation.navigate(screenName);
      onClose();
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          <View style={styles.header}>
            <Text style={styles.title}>Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="close" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>
          
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.name}
              style={styles.menuItem}
              onPress={() => handleNavigation(item.name)}
            >
              <Icon name={item.icon} size={24} color="#06b6d4" />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  sidebar: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a'
  },
  closeBtn: {
    padding: 4
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  menuText: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 16
  }
});