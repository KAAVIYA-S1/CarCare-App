import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../services/AuthContext';

export default function EditProfileScreen({navigation}){
  const { user, updateProfile } = useAuth();
  const [name,setName] = useState(user?.name || '');
  const [phone,setPhone] = useState(user?.phone || '');
  const [email,setEmail] = useState(user?.email || '');
  const [carMake,setCarMake] = useState(user?.carMake || '');
  const [carModel,setCarModel] = useState(user?.carModel || '');
  const [carYear,setCarYear] = useState(user?.carYear || '');
  const [licensePlate,setLicensePlate] = useState(user?.licensePlate || '');
  const [carColor,setCarColor] = useState(user?.carColor || '');
  const [address,setAddress] = useState(user?.address || '');
  const [city,setCity] = useState(user?.city || '');
  const [zipCode,setZipCode] = useState(user?.zipCode || '');

  const save = async ()=>{
    try{
      const updated = await updateProfile({name,phone,email,carMake,carModel,carYear,licensePlate,carColor,address,city,zipCode});
      Alert.alert('Saved','Profile updated');
      navigation.goBack();
    }catch(e){ Alert.alert('Error',e.message); }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      
      <Text style={styles.sectionTitle}>Basic Information</Text>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Mobile Number</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      
      <Text style={styles.sectionTitle}>Vehicle Information</Text>
      <Text style={styles.label}>Car Make</Text>
      <TextInput style={styles.input} value={carMake} onChangeText={setCarMake} placeholder="e.g., Toyota, BMW" />
      <Text style={styles.label}>Car Model</Text>
      <TextInput style={styles.input} value={carModel} onChangeText={setCarModel} placeholder="e.g., Corolla, 320i" />
      <Text style={styles.label}>Year of Manufacture</Text>
      <TextInput style={styles.input} value={carYear} onChangeText={setCarYear} placeholder="e.g., 2020" />
      <Text style={styles.label}>License Plate Number</Text>
      <TextInput style={styles.input} value={licensePlate} onChangeText={setLicensePlate} placeholder="Optional" />
      <Text style={styles.label}>Car Color</Text>
      <TextInput style={styles.input} value={carColor} onChangeText={setCarColor} placeholder="e.g., White, Black" />
      
      <Text style={styles.sectionTitle}>Address & Delivery</Text>
      <Text style={styles.label}>Home Address</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} multiline />
      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />
      <Text style={styles.label}>ZIP Code</Text>
      <TextInput style={styles.input} value={zipCode} onChangeText={setZipCode} />
      
      <TouchableOpacity style={styles.saveButton} onPress={save}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16,backgroundColor:'#fff'},
  title:{fontSize:24,fontWeight:'700',marginBottom:20,color:'#0f172a'},
  sectionTitle:{fontSize:18,fontWeight:'600',color:'#06b6d4',marginTop:20,marginBottom:12},
  label:{fontSize:14,fontWeight:'500',color:'#374151',marginBottom:6},
  input:{borderWidth:1,borderColor:'#d1d5db',padding:12,borderRadius:8,marginBottom:16,fontSize:16},
  saveButton:{backgroundColor:'#06b6d4',padding:16,borderRadius:8,alignItems:'center',marginTop:20,marginBottom:40},
  saveButtonText:{color:'#fff',fontSize:16,fontWeight:'600'}
});
