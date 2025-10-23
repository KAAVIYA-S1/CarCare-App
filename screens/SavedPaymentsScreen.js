import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

export default function SavedPaymentsScreen(){
  const methods = [
    {id:'p1',type:'Card',label:'**** 4242'},
    {id:'p2',type:'UPI',label:'yourid@upi'}
  ];

  const remove = (id)=>{
    Alert.alert('Delete','Remove this payment method?',[
      {text:'Cancel',style:'cancel'},
      {text:'Remove',style:'destructive',onPress:()=>{/* TODO: remove */}}
    ]);
  };

  return (
    <View style={{flex:1,padding:16}}>
      <Text style={{fontSize:20,fontWeight:'700',marginBottom:12}}>Saved Payment Methods</Text>
      <FlatList data={methods} keyExtractor={i=>i.id} renderItem={({item})=> (
        <View style={{padding:12,backgroundColor:'#fff',borderRadius:8,marginBottom:8}}>
          <Text style={{fontWeight:'700'}}>{item.type}</Text>
          <Text style={{color:'#666'}}>{item.label}</Text>
          <TouchableOpacity onPress={()=>remove(item.id)} style={{marginTop:8}}>
            <Text style={{color:'red'}}>Remove</Text>
          </TouchableOpacity>
        </View>
      )} />
    </View>
  );
}
