import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../services/CartContext';

export default function TopNav(props){
  const { navigation, route } = props;
  const [menuOpen,setMenuOpen] = useState(false);
  const width = Dimensions.get('window').width;
  const { getCartCount } = useCart();

  const items = [
    {name:'Home',label:'Home'},
    {name:'Brands',label:'Products'},
    {name:'Booking',label:'Bookings'},
    {name:'Offers',label:'Offers'},
    {name:'Support',label:'Support'},
    {name:'About',label:'About'}
  ];

  // map active route to top nav key
  const routeName = route?.name || '';
  const normalize = (r)=>{
    if (!r) return 'Home';
    if (r==='BookingHistory' || r==='ServiceHistory') return 'Booking';
    if (items.find(i=>i.name===r)) return r;
    return 'Home';
  };
  const active = normalize(routeName);

  const go = (name)=>{
    setMenuOpen(false);
    navigation.navigate(name);
  };

  if (width < 640) {
    // compact header with hamburger
    return (
      <View style={styles.headerCompact}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Text style={styles.brand}>🏁 CarCare</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={styles.iconBtn}>
            <View style={styles.cartContainer}>
              <Icon name="shopping-cart" size={20} color="#06b6d4" />
              {getCartCount() > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={styles.iconBtn}>
            <Text>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setMenuOpen(true)} style={styles.iconBtn}>
            <Text>☰</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={menuOpen} animationType="slide" onRequestClose={()=>setMenuOpen(false)}>
          <View style={{flex:1,padding:20}}>
            <TouchableOpacity onPress={()=>setMenuOpen(false)} style={{marginBottom:12}}>
              <Text style={{fontSize:18}}>Close ✕</Text>
            </TouchableOpacity>
            {items.map(i=> (
              <TouchableOpacity key={i.name} onPress={()=>go(i.name)} style={styles.menuItem}>
                <Text style={active===i.name?styles.menuItemActive:styles.menuItemText}>{i.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Text style={styles.brand}>🏁 CarCare</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navScroll} contentContainerStyle={styles.navRow}>
        {items.map(i=> (
          <TouchableOpacity key={i.name} onPress={()=>go(i.name)} style={[styles.navItem, active===i.name && styles.navItemActive]}>
            <Text style={[styles.navText, active===i.name && styles.navTextActive]}>{i.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={styles.iconBtn}>
          <View style={styles.cartContainer}>
            <Icon name="shopping-cart" size={20} color="#06b6d4" />
            {getCartCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={styles.iconBtn}>
          <Text>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{height:64,backgroundColor:'#fff',paddingHorizontal:16,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#e2e8f0',elevation:2,shadowColor:'#000',shadowOffset:{width:0,height:1},shadowOpacity:0.1,shadowRadius:2},
  headerCompact:{height:64,backgroundColor:'#f8fafc',paddingHorizontal:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#e6eef2'},
  brand:{fontSize:18,fontWeight:'700'},
  navScroll:{flex:1},
  navRow:{alignItems:'center',justifyContent:'space-evenly',minWidth:'100%'},
  navItem:{paddingHorizontal:12,paddingVertical:12,alignItems:'center',borderRadius:8,marginHorizontal:2},
  navItemActive:{backgroundColor:'#06b6d4'},
  navText:{color:'#64748b',fontSize:14,fontWeight:'400'},
  navTextActive:{color:'#fff',fontWeight:'600'},
  iconBtn:{padding:8,marginLeft:8},
  cartContainer:{position:'relative'},
  cartBadge:{position:'absolute',top:-4,right:-4,backgroundColor:'#ef4444',borderRadius:8,minWidth:16,height:16,justifyContent:'center',alignItems:'center'},
  cartBadgeText:{color:'#fff',fontSize:10,fontWeight:'600'},
  menuItem:{paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#eef2f7'},
  menuItemText:{fontSize:16,color:'#334155',fontWeight:'400'},
  menuItemActive:{fontSize:16,color:'#0369a1',fontWeight:'600'}
});
