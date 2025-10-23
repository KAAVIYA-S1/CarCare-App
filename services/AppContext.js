import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AppContext = createContext();

const SERVICE_CATEGORIES = {
  'Car Wash': {
    id: 'wash',
    basePrice: 999,
    services: [
      { id: 'basic-wash', name: 'Basic Wash', price: 999 },
      { id: 'premium-wash', name: 'Premium Wash', price: 1499 },
      { id: 'deep-clean', name: 'Deep Clean', price: 1999 }
    ]
  },
  'Exterior': {
    id: 'exterior',
    basePrice: 999,
    services: [
      { id: 'exterior-detailing', name: 'Exterior Detailing', price: 2499 },
      { id: 'scratch-removal', name: 'Scratch Removal', price: 1499 },
      { id: 'headlight-restoration', name: 'Headlight Restoration', price: 999 }
    ]
  },
  'Paint Protection': {
    id: 'paint',
    basePrice: 999,
    services: [
      { id: 'ceramic-coating', name: 'Ceramic Coating', price: 14999 },
      { id: 'paint-sealant', name: 'Paint Sealant', price: 4999 },
      { id: 'ppf', name: 'Paint Protection Film', price: 19999 }
    ]
  },
  'Interior Detailing': {
    id: 'interior',
    basePrice: 999,
    services: [
      { id: 'interior-deep-clean', name: 'Interior Deep Clean', price: 2499 },
      { id: 'leather-care', name: 'Leather Care', price: 1999 },
      { id: 'sanitization', name: 'Sanitization', price: 1499 }
    ]
  },
  'Special Treatment': {
    id: 'special',
    basePrice: 999,
    services: [
      { id: 'rust-protection', name: 'Rust Protection', price: 3999 },
      { id: 'ac-treatment', name: 'AC Treatment', price: 1499 },
      { id: 'odor-removal', name: 'Odor Removal', price: 999 }
    ]
  },
  'Ceramic Booth': {
    id: 'ceramic',
    basePrice: 999,
    services: [
      { id: '9h-ceramic', name: '9H Ceramic Coating', price: 24999 },
      { id: '5h-ceramic', name: '5H Ceramic Coating', price: 19999 },
      { id: '3h-ceramic', name: '3H Ceramic Coating', price: 14999 }
    ]
  },
  'Teflon Coating': {
    id: 'teflon',
    basePrice: 999,
    services: [
      { id: 'teflon-premium', name: 'Premium Teflon', price: 4999 },
      { id: 'teflon-standard', name: 'Standard Teflon', price: 2999 },
      { id: 'teflon-basic', name: 'Basic Teflon', price: 1999 }
    ]
  },
  'Engine Care': {
    id: 'engine',
    basePrice: 1499,
    services: [
      { id: 'engine-detailing', name: 'Engine Bay Detailing', price: 2499 },
      { id: 'engine-coating', name: 'Engine Protection Coating', price: 3499 },
      { id: 'engine-degreasing', name: 'Engine Degreasing', price: 1499 },
      { id: 'engine-steam', name: 'Engine Steam Cleaning', price: 1999 }
    ]
  }
};

const SAMPLE = {
  cars:[
    {id:'car-1',nickname:'My Swift',make:'Maruti',model:'Swift',year:'2020',registration:'MH01AB1234',color:'White'},
    {id:'car-2',nickname:'City Car',make:'Honda',model:'City',year:'2019',registration:'DL02CD5678',color:'Silver'},
    {id:'car-3',nickname:'Luxury Ride',make:'Audi',model:'A4',year:'2021',registration:'KA03EF9012',color:'Black'}
  ],
  serviceHistory:[],
  membership: null,
  offers: [
    {
      id: 'offer-1',
      title: '50% Off on Selected Services',
      description: 'Get up to 50% off on premium car care services',
      validTill: '2025-12-31'
    }
  ]
};

export function AppProvider({children}){
  const [cars, setCars] = useState(SAMPLE.cars);
  const [serviceHistory, setServiceHistory] = useState(SAMPLE.serviceHistory);
  const [bookings, setBookings] = useState(SAMPLE.bookings || []);
  const [membership, setMembership] = useState(SAMPLE.membership);
  const [offers, setOffers] = useState(SAMPLE.offers);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  
  // Service data
  const [serviceCategories] = useState(SERVICE_CATEGORIES);

  useEffect(()=>{(async ()=>{
    try{
      const raw = await AsyncStorage.getItem('appState');
      if (raw){
        const st = JSON.parse(raw);
        setCars(st.cars && st.cars.length > 0 ? st.cars : SAMPLE.cars);
        setServiceHistory(st.serviceHistory||SAMPLE.serviceHistory);
        setBookings(st.bookings||[]);
        setDarkMode(st.darkMode||false);
        setNotificationsEnabled(typeof st.notificationsEnabled === 'boolean' ? st.notificationsEnabled : true);
        setLanguage(st.language || 'en');
        setSelectedBranch(st.selectedBranch || null);
      }
    }catch(e){ console.warn(e); }
  })();},[]);

  useEffect(()=>{(async ()=>{
    try{
      await AsyncStorage.setItem('appState',JSON.stringify({
        cars,
        serviceHistory,
        bookings,
        darkMode,
        notificationsEnabled,
        language,
        selectedBranch
      }));
    }catch(e){ console.warn(e); }
  })();},[cars,serviceHistory,bookings,darkMode,notificationsEnabled,selectedBranch]);

  const getCarById = (id)=> cars.find(c=>c.id===id);
  const addCar = (car)=>{
    const newCar = {...car,id:`car-${Date.now()}`};
    setCars([newCar,...cars]);
  };
  const updateCar = (id, data)=>{
    setCars(cars.map(c=>c.id===id?{...c,...data}:c));
  };
  const deleteCar = (id)=>{
    setCars(cars.filter(c=>c.id!==id));
    setServiceHistory(serviceHistory.filter(s=>s.carId!==id));
  };

  const addService = (service)=>{
    const newS = {...service,id:`s-${Date.now()}`,carTitle: getCarById(service.carId)?.make+' '+getCarById(service.carId)?.model};
    setServiceHistory([newS,...serviceHistory]);
  };

  // Bookings: add, update status
  const addBooking = (booking)=>{
    const newB = {
      ...booking,
      id:`b-${Date.now()}`,
      status: booking.status || 'upcoming'
    };
    setBookings([newB,...bookings]);
    // Also create a simple serviceHistory entry for integration
    try{
      const svc = {
        id:`s-${Date.now()+1}`,
        carId: booking.carId || null,
        carTitle: booking.carTitle || booking.carType || null,
        title: booking.service || booking.serviceType || 'Service booking',
        date: (booking.date || new Date().toISOString()).slice(0,10),
        notes: booking.notes || 'Booked via app',
        bookingId: newB.id
      };
      setServiceHistory(sh=>[svc,...sh]);
    }catch(e){console.warn('addBooking->serviceHistory',e)}
    return newB;
  };

  const updateBooking = (id, patch)=>{
    console.log('Updating booking:', id, patch);
    setBookings(prev => prev.map(b=>b.id===id?{...b,...patch}:b));
  };

  const deleteBooking = (id) => {
    console.log('Deleting booking:', id);
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const cancelBooking = (id)=>{
    updateBooking(id,{status:'cancelled'});
  };

  const resetApp = async ()=>{
    try{
      await AsyncStorage.removeItem('appState');
    }catch(e){console.warn(e)}
    setCars(SAMPLE.cars);
    setServiceHistory(SAMPLE.serviceHistory);
    setBookings([]);
    setDarkMode(false);
    setNotificationsEnabled(true);
  };

  const upcomingServices = serviceHistory.filter(s=>{
    // simplistic: show services with future dates (YYYY-MM-DD string)
    const today = new Date().toISOString().slice(0,10);
    return s.date >= today;
  }).slice(0,5);

  const upcomingBookings = bookings.filter(b=> b.status==='upcoming').slice(0,5);

  // Get all services for a category
  const getCategoryServices = (categoryId) => {
    const category = Object.values(serviceCategories).find(c => c.id === categoryId);
    return category ? category.services : [];
  };

  // Get service details by ID
  const getServiceById = (serviceId) => {
    for (const category of Object.values(serviceCategories)) {
      const service = category.services.find(s => s.id === serviceId);
      if (service) return service;
    }
    return null;
  };

  // Membership functions
  const setActiveMembership = (membershipData) => {
    setMembership(membershipData);
  };

  // Branch functions
  const selectBranch = (branch) => {
    setSelectedBranch(branch);
  };

  return (
    <AppContext.Provider value={{
      // Car management
      cars, getCarById, addCar, updateCar, deleteCar,
      
      // Service management
      serviceHistory, addService,
      serviceCategories, getCategoryServices, getServiceById,
      
      // Booking management
      bookings, addBooking, updateBooking, cancelBooking, deleteBooking,
      upcomingServices, upcomingBookings,
      
      // Membership
      membership, setActiveMembership,
      
      // Location/Branch
      selectedBranch, selectBranch,
      
      // Offers
      offers,
      
      // App settings
      darkMode, setDarkMode,
      notificationsEnabled, setNotificationsEnabled,
      language, setLanguage,
      
      // Utilities
      resetApp
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = ()=> useContext(AppContext);
