import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListItem({title,subtitle,onPress}){
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{padding:12,backgroundColor:'#fff',borderRadius:8,marginBottom:8},
  title:{fontWeight:'600'},
  subtitle:{color:'#666'}
});
