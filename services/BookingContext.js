import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingContext = createContext();

const SAMPLE = [
  {id:'b-1',carType:'Sedan',service:'Premium Wash',date:'2025-10-25',time:'10:00',location:'Home',status:'upcoming',notes:''}
];

export function BookingProvider({children}){
  const [bookings,setBookings] = useState(SAMPLE);

  useEffect(()=>{(async ()=>{
    try{
      const raw = await AsyncStorage.getItem('bookings');
      if (raw) setBookings(JSON.parse(raw));
    }catch(e){console.warn(e)}
  })();},[]);

  useEffect(()=>{(async ()=>{
    try{ await AsyncStorage.setItem('bookings',JSON.stringify(bookings)); }catch(e){console.warn(e)}
  })();},[bookings]);

  const addBooking = (b)=>{
    const nb = {...b,id:`b-${Date.now()}`};
    setBookings([nb,...bookings]);
  };

  const cancelBooking = (id)=> setBookings(bookings.map(b=>b.id===id?{...b,status:'cancelled'}:b));

  return (
    <BookingContext.Provider value={{bookings,addBooking,cancelBooking}}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = ()=> useContext(BookingContext);
