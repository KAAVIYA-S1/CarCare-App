import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useApp } from '../services/AppContext';

export default function ServiceHistoryScreen() {
  const { serviceHistory } = useApp();

  return (
    <View style={{flex:1,padding:16}}>
      <Text style={styles.title}>Service History</Text>
      <FlatList
        data={serviceHistory}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> (
          <View style={styles.row}>
            <Text style={{fontWeight:'600'}}>{item.carTitle}</Text>
            <Text>{item.title} - {item.date}</Text>
            <Text>{item.notes}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title:{fontSize:20,fontWeight:'700',marginBottom:12},
  row:{padding:12,backgroundColor:'#fff',borderRadius:8,marginBottom:8}
});
