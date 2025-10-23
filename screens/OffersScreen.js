import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function OffersScreen(){
  const offers = [
    {id:'o1',title:'10% off on Premium Wash',code:'PREM10'},
    {id:'o2',title:'Free interior vacuum with Full Detail',code:'FREEDUST'}
  ];

  return (
    <View style={{flex:1,padding:16}}>
      <Text style={styles.title}>Offers & Discounts</Text>
      <FlatList data={offers} keyExtractor={i=>i.id} renderItem={({item})=> (
        <View style={styles.card}>
          <Text style={{fontWeight:'700'}}>{item.title}</Text>
          <Text style={{color:'#06b6d4',marginTop:6}}>Code: {item.code}</Text>
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  title:{fontSize:20,fontWeight:'700',marginBottom:12},
  card:{padding:12,backgroundColor:'#fff',borderRadius:8,marginBottom:8}
});
