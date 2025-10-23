import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ServiceCard({service,onPress}){
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.price}>${service.price}</Text>
      <Text style={styles.desc}>{service.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:{backgroundColor:'#fff',padding:12,borderRadius:10,margin:6,flex:1,minWidth:160},
  title:{fontWeight:'700'},
  price:{color:'#06b6d4',fontWeight:'700',marginTop:6},
  desc:{color:'#666',marginTop:8}
});
