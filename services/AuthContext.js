import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AuthContext = createContext();

export function AuthProvider({children}){
  const [user,setUser] = useState(null);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      try{
        const raw = await AsyncStorage.getItem('user');
        if (raw) setUser(JSON.parse(raw));
      }catch(e){ console.warn(e); }
      setIsLoading(false);
    })();
  },[]);

  const signIn = async ({email,password})=>{
    // For MVP, accept any credentials and store locally
    const u = {id:'user-1',email};
    await AsyncStorage.setItem('user',JSON.stringify(u));
    setUser(u);
  };

  const signUp = async ({email,password})=>{
    // No server-side signup for MVP
    await signIn({email,password});
  };

  const signOut = async ()=>{
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (patch)=>{
    const next = {...user,...patch};
    await AsyncStorage.setItem('user',JSON.stringify(next));
    setUser(next);
    return next;
  };

  const changePassword = async ({oldPassword,newPassword})=>{
    // MVP: no real password stored; just return success if newPassword meets simple rules
    if (!newPassword || newPassword.length < 6) throw new Error('Password must be at least 6 characters');
    return true;
  };

  return (
    <AuthContext.Provider value={{user,isLoading,signIn,signUp,signOut,updateProfile,changePassword}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=> useContext(AuthContext);
