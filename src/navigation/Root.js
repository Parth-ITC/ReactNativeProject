import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import useAuth from '../hooks/useAuth';
import {COLORS} from '../constants';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/Splash/SplashScreen';
import {navigationRef} from './rootNavigation';
import {addSslPinningErrorListener} from 'react-native-ssl-public-key-pinning';
import { useEffect } from 'react';
import NotificationHelper from '../helpers/NotificationHelper';

const Stack = createNativeStackNavigator();

const Root = () => {
  const {authData, loading} = useAuth();
  useEffect(() => {
    NotificationHelper.initialize()
    const subscription = addSslPinningErrorListener(error => {
      // Triggered when an SSL pinning error occurs due to pin mismatch
      console.log(error.serverHostname);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <NavigationContainer ref={navigationRef}>
        {authData?.token || authData?.uid ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Root;
