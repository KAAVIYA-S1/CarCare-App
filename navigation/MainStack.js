import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import ServiceHistoryScreen from '../screens/ServiceHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookingScreen from '../screens/BookingScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import OffersScreen from '../screens/OffersScreen';
import SupportScreen from '../screens/SupportScreen';
import AboutScreen from '../screens/AboutScreen';
import TopNav from '../components/TopNav';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import SavedPaymentsScreen from '../screens/SavedPaymentsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import YourCarsScreen from '../screens/YourCarsScreen';
import AddCarScreen from '../screens/AddCarScreen';
import BrandsScreen from '../screens/BrandsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import EditCarScreen from '../screens/EditCarScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation,route})=>({
        header: (props)=>(<TopNav {...props} navigation={navigation} route={route} />)
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Brands" component={BrandsScreen} />
      <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
      <Stack.Screen name="ServiceHistory" component={ServiceHistoryScreen} />
      <Stack.Screen name="Offers" component={OffersScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
  <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
  <Stack.Screen name="SavedPayments" component={SavedPaymentsScreen} />
  <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
  <Stack.Screen name="YourCars" component={YourCarsScreen} />
      <Stack.Screen name="AddCar" component={AddCarScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="EditCar" component={EditCarScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
