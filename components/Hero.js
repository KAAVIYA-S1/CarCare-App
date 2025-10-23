import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Hero({title,subtitle,ctaLabel,onCta}){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <TouchableOpacity style={styles.cta} onPress={onCta}>
        <Text style={styles.ctaText}>{ctaLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{padding:24,backgroundColor:'#0f172a',borderRadius:12,marginBottom:16},
  title:{color:'#fff',fontSize:28,fontWeight:'700',marginBottom:8},
  subtitle:{color:'#cbd5e1',marginBottom:12,fontWeight:'400'},
  cta:{backgroundColor:'#06b6d4',paddingVertical:12,paddingHorizontal:20,borderRadius:8,alignSelf:'flex-start'},
  ctaText:{color:'#012',fontWeight:'600'}
});
