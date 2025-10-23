import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useApp } from '../services/AppContext';

export default function CarDetailsScreen({ route, navigation }) {
  const { carId, mode } = route.params || {};
  const { getCarById, addCar, updateCar, deleteCar } = useApp();
  const [car, setCar] = useState({make:'',model:'',year:'',registration:''});

  useEffect(()=>{
    if (carId) {
      const found = getCarById(carId);
      if (found) setCar(found);
    }
  },[carId]);

  const save = ()=>{
    if (!car.make || !car.model) { Alert.alert('Please enter make and model'); return; }
    if (carId) updateCar(carId,car);
    else addCar(car);
    navigation.goBack();
  }

  const remove = ()=>{
    if (!carId) return;
    deleteCar(carId);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{carId ? 'Edit Car' : 'Add Car'}</Text>
      <TextInput placeholder="Make" style={styles.input} value={car.make} onChangeText={(t)=>setCar({...car,make:t})} />
      <TextInput placeholder="Model" style={styles.input} value={car.model} onChangeText={(t)=>setCar({...car,model:t})} />
      <TextInput placeholder="Year" style={styles.input} value={car.year} onChangeText={(t)=>setCar({...car,year:t})} />
      <TextInput placeholder="Registration" style={styles.input} value={car.registration} onChangeText={(t)=>setCar({...car,registration:t})} />
      <Button title="Save" onPress={save} />
      {carId && <View style={{height:8}} />}
      {carId && <Button title="Delete" color="red" onPress={remove} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  title:{fontSize:20,fontWeight:'700',marginBottom:12},
  input:{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:8,marginBottom:10}
});
