import React from 'react';
import { View, Text } from 'react-native';

export default function AboutScreen(){
  return (
    <View style={{flex:1,padding:16}}>
      <Text style={{fontSize:20,fontWeight:'700'}}>About Us</Text>
      <View style={{height:12}} />
      <Text>We provide doorstep car cleaning and maintenance services with trained technicians and quality products. Our mission is to keep your car clean and your life easy.</Text>
    </View>
  );
}
