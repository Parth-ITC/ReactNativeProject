import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 2000);
  }, []);

  const onAuthStateChanged = async user => {
    if(user){
      setAuthData(user);
      await AsyncStorage.setItem('isLogin', JSON.stringify(user));
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const loadData = async () => {
    try {
      const authDataSerialized = await AsyncStorage.getItem('isLogin');
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const signIn = async userId => {
    setAuthData({token: userId});
    await AsyncStorage.setItem('isLogin', JSON.stringify({token: userId}));
  };

  const signOut = async () => {
    setAuthData(null);
    await AsyncStorage.removeItem('isLogin');
  };

  const AuthValue = {
    authData,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
