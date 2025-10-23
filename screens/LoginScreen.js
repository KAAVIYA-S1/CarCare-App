import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../services/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const { signIn } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CarCare</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={() => signIn({email,password})} />
      <View style={{height:12}} />
      <Button title="Create account" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',padding:20},
  title:{fontSize:32,fontWeight:'700',textAlign:'center',marginBottom:20},
  input:{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:8,marginBottom:10}
});
