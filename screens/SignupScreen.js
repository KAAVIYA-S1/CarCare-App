import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../services/AuthContext';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign up" onPress={() => signUp({email,password})} />
      <View style={{height:12}} />
      <Button title="Back to login" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',padding:20},
  title:{fontSize:24,fontWeight:'600',textAlign:'center',marginBottom:20},
  input:{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:8,marginBottom:10}
});
