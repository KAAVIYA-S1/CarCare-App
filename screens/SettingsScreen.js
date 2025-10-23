import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../services/AuthContext';
import { useApp } from '../services/AppContext';

function Section({title,children}){
  const [open,setOpen] = useState(true);
  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={()=>setOpen(!open)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text>{open? '−' : '+'}</Text>
      </TouchableOpacity>
      {open && <View style={styles.sectionBody}>{children}</View>}
    </View>
  );
}

export default function SettingsScreen({navigation}) {
  const { user, signOut } = useAuth();
  const { darkMode, setDarkMode, notificationsEnabled, setNotificationsEnabled, resetApp, language, setLanguage } = useApp();
  const [langOpen,setLangOpen] = useState(false);

  const confirmSignOut = ()=>{
    Alert.alert('Sign out','Are you sure you want to sign out?',[
      {text:'Cancel',style:'cancel'},
  {text:'Sign out',style:'destructive',onPress:async ()=>{ await signOut(); /* RootNavigator should switch to AuthStack; also reset parent navigator as a fallback */ try{ navigation.getParent()?.reset({index:0,routes:[{name:'Login'}]}); }catch(e){} }}
    ]);
  };

  const confirmReset = ()=>{
    Alert.alert('Reset app','This will clear local data. Continue?',[
      {text:'Cancel',style:'cancel'},
      {text:'Reset',style:'destructive',onPress:()=>resetApp()}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Section title="Account Settings">
        <Text style={styles.itemTitle}>Email</Text>
        <Text style={styles.itemSub}>{user?.email}</Text>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.row} onPress={()=> navigation.navigate('EditProfile')}>
          <Text>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={()=> navigation.navigate('ChangePassword')}>
          <Text>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={()=> navigation.navigate('YourCars')}>
          <Text>Manage saved cars</Text>
        </TouchableOpacity>
      </Section>

      <Section title="App Preferences">
        <View style={styles.prefRow}>
          <Text>Dark mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <View style={styles.prefRow}>
          <Text>Notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.row} onPress={()=> setLangOpen(true)}>
          <Text>Select language: {language}</Text>
        </TouchableOpacity>
        {langOpen && (
          <View style={{padding:12}}>
            {['en','hi','ta'].map(l=> (
              <TouchableOpacity key={l} onPress={()=>{ setLanguage(l); setLangOpen(false); }} style={{paddingVertical:8}}>
                <Text style={{fontWeight: language===l? '700':'400'}}>{l==='en'? 'English': l==='hi'? 'Hindi':'Tamil'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Section>

      <Section title="Payments & Privacy">
        <TouchableOpacity style={styles.row} onPress={()=> navigation.navigate('SavedPayments')}>
          <Text>Manage payment methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={()=> navigation.navigate('PrivacyPolicy')}>
          <Text>Privacy policy</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.row} onPress={confirmSignOut}>
          <Text style={{color:'red'}}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={confirmReset}>
          <Text style={{color:'red'}}>Reset app</Text>
        </TouchableOpacity>
      </Section>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  title:{fontSize:22,fontWeight:'700',marginBottom:12},
  section:{backgroundColor:'#fff',borderRadius:12,padding:8,marginBottom:12,shadowColor:'#000',shadowOpacity:0.03},
  sectionHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:12},
  sectionTitle:{fontWeight:'700'},
  sectionBody:{paddingHorizontal:12,paddingBottom:12},
  row:{paddingVertical:10},
  itemTitle:{fontWeight:'600'},
  itemSub:{color:'#666',marginBottom:8},
  divider:{height:1,backgroundColor:'#eef2f7',marginVertical:8}
});
