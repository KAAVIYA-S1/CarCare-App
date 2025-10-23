import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function PrivacyPolicyScreen(){
  return (
    <ScrollView style={{flex:1,padding:16}}>
      <Text style={{fontSize:20,fontWeight:'700',marginBottom:12}}>Privacy Policy</Text>
      <Text>This is a placeholder privacy policy. Replace with your real policy text.</Text>
    </ScrollView>
  );
}
