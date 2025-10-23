import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../services/AuthContext';

export default function ChangePasswordScreen({navigation}){
  const { changePassword } = useAuth();
  const [oldPass,setOldPass] = useState('');
  const [newPass,setNewPass] = useState('');
  const [confirm,setConfirm] = useState('');

  const submit = async ()=>{
    if (newPass !== confirm) { Alert.alert('Error','New passwords do not match'); return; }
    try{
      await changePassword({oldPassword:oldPass,newPassword:newPass});
      Alert.alert('Success','Password changed');
      navigation.goBack();
    }catch(e){ Alert.alert('Error',e.message); }
  };

  return (
    <View style={{flex:1,padding:16}}>
      <Text style={styles.title}>Change Password</Text>
      <Text>Old password</Text>
      <TextInput style={styles.input} secureTextEntry value={oldPass} onChangeText={setOldPass} />
      <Text>New password</Text>
      <TextInput style={styles.input} secureTextEntry value={newPass} onChangeText={setNewPass} />
      <Text>Confirm new password</Text>
      <TextInput style={styles.input} secureTextEntry value={confirm} onChangeText={setConfirm} />
      <View style={{height:12}} />
      <Button title="Change" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  title:{fontSize:20,fontWeight:'700',marginBottom:12},
  input:{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:8,marginBottom:10}
});
