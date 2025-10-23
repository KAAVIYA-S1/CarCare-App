import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useApp } from '../services/AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BRANCHES = [
  {
    id: 'b1',
    name: 'Chennai - Anna Nagar',
    address: '2nd Avenue, Anna Nagar, Chennai - 600040',
    phone: '+91 94444 55555',
    hours: '9:00 AM - 8:00 PM'
  },
  {
    id: 'b2',
    name: 'Chennai - OMR',
    address: 'Thoraipakkam, OMR, Chennai - 600097',
    phone: '+91 94444 66666',
    hours: '9:00 AM - 8:00 PM'
  },
  {
    id: 'b3',
    name: 'Chennai - ECR',
    address: 'Palavakkam, ECR, Chennai - 600041',
    phone: '+91 94444 77777',
    hours: '9:00 AM - 8:00 PM'
  },
  {
    id: 'b4',
    name: 'Chennai - Velachery',
    address: 'Velachery Main Road, Chennai - 600042',
    phone: '+91 94444 88888',
    hours: '9:00 AM - 8:00 PM'
  }
];

export default function SelectBranchScreen({ navigation }) {
  const { selectBranch, selectedBranch } = useApp();
  const [search, setSearch] = useState('');
  const [selecting, setSelecting] = useState(false);
  
  const filteredBranches = BRANCHES.filter(branch => 
    branch.name.toLowerCase().includes(search.toLowerCase()) ||
    branch.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectBranch = async (branch) => {
    try {
      setSelecting(true);
      await selectBranch(branch);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not select branch. Please try again.');
    } finally {
      setSelecting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by location..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Branches List */}
      <ScrollView>
        {filteredBranches.map(branch => (
          <TouchableOpacity
            key={branch.id}
            style={[
              styles.branchCard,
              selectedBranch?.id === branch.id && styles.selectedBranchCard
            ]}
            onPress={() => handleSelectBranch(branch)}
            disabled={selecting}
          >
            <View style={styles.branchHeader}>
              <Text style={[
                styles.branchName,
                selectedBranch?.id === branch.id && styles.selectedBranchText
              ]}>{branch.name}</Text>
              {selecting && selectedBranch?.id === branch.id ? (
                <ActivityIndicator color="#06b6d4" />
              ) : (
                <Icon 
                  name={selectedBranch?.id === branch.id ? "check-circle" : "chevron-right"} 
                  size={24} 
                  color={selectedBranch?.id === branch.id ? "#06b6d4" : "#64748b"} 
                />
              )}
            </View>
            
            <View style={styles.branchDetails}>
              <View style={styles.detailRow}>
                <Icon name="location-on" size={16} color="#06b6d4" />
                <Text style={styles.detailText}>{branch.address}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Icon name="phone" size={16} color="#06b6d4" />
                <Text style={styles.detailText}>{branch.phone}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Icon name="access-time" size={16} color="#06b6d4" />
                <Text style={styles.detailText}>{branch.hours}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  selectedBranchCard: {
    backgroundColor: '#f0fdff',
    borderColor: '#06b6d4'
  },
  selectedBranchText: {
    color: '#06b6d4'
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a'
  },
  branchCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  branchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  branchName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a'
  },
  branchDetails: {
    gap: 8
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    flex: 1
  }
});